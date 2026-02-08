const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Database Setup
const db = new sqlite3.Database('./opengrid.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the SQLite database.');
});

// Create Tables
db.serialize(() => {
    // 1. Incidents Table
    db.run(`CREATE TABLE IF NOT EXISTS bugs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lat REAL, lng REAL,
        title TEXT, desc TEXT, loc TEXT,
        type TEXT, image TEXT,
        votes INTEGER DEFAULT 0,
        time INTEGER,
        assigned_to INTEGER,
        priority INTEGER DEFAULT 1
    )`);

    // 2. Comments Table (NEW - For the Chat Feature)
    db.run(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bug_id INTEGER,
        username TEXT,
        text TEXT,
        time INTEGER
    )`);
});

// --- API ROUTES ---

// Get All Bugs
app.get('/api/bugs', (req, res) => {
    const { search, type, sort } = req.query;
    let sql = "SELECT * FROM bugs WHERE 1=1";
    let params = [];

    if (search) { sql += " AND title LIKE ?"; params.push(`%${search}%`); }
    if (type) { sql += " AND type = ?"; params.push(type); }
    
    if (sort === 'votes') sql += " ORDER BY votes DESC";
    else if (sort === 'oldest') sql += " ORDER BY time ASC";
    else sql += " ORDER BY time DESC"; // Default: Newest first

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get Single Bug
app.get('/api/bugs/:id', (req, res) => {
    db.get("SELECT * FROM bugs WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// Report New Bug (or Traffic Sync)
app.post('/api/bugs', (req, res) => {
    const { lat, lng, title, desc, loc, type, image, time } = req.body;
    db.run(`INSERT INTO bugs (lat, lng, title, desc, loc, type, image, time) VALUES (?,?,?,?,?,?,?,?)`,
        [lat, lng, title, desc, loc, type, image, time || Date.now()],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Update Bug (Vote or Resolve)
app.patch('/api/bugs/:id', (req, res) => {
    const { votes, type } = req.body;
    let sql = "UPDATE bugs SET ";
    let params = [];
    
    if (votes) { sql += "votes = ?, "; params.push(votes); }
    if (type) { sql += "type = ?, "; params.push(type); }
    
    sql = sql.slice(0, -2) + " WHERE id = ?";
    params.push(req.params.id);

    db.run(sql, params, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Updated" });
    });
});

// --- CHAT ROUTES ---

// Get Comments for a Bug
app.get('/api/comments/:bugId', (req, res) => {
    db.all('SELECT * FROM comments WHERE bug_id = ? ORDER BY time ASC', [req.params.bugId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Post a Comment
app.post('/api/comments', (req, res) => {
    const { bug_id, username, text } = req.body;
    db.run(`INSERT INTO comments (bug_id, username, text, time) VALUES (?, ?, ?, ?)`,
        [bug_id, username, text, Date.now()],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});