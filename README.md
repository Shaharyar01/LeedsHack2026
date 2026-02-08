# LeedsHack2026# OpenGrid UK 🇬🇧

OpenGrid UK is a Node.js‑powered community reporting platform that enables residents to raise local issues directly to councils, while providing councils with clear visibility into issue severity, risk, and public sentiment. The goal is to improve accountability, reduce delays, and strengthen trust between communities and local authorities.

This project was built as part of **Leeds Hack 2026**.

---

## 🚀 Features

* 🗺️ Community issue reporting via a simple web interface
* 📊 Analytics dashboard showing issue volume, risk, and public frustration
* 🧑‍💼 Admin panel for council or moderator review
* 🔐 Basic authentication for admin access
* 🗄️ SQLite database for lightweight, local data storage
* 🌐 Static frontend served directly from the Node.js server

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** SQLite3
* **Frontend:** HTML, CSS, JavaScript
* **Middleware:** body-parser, cors

---

## 📁 Project Structure

```
.
├── server.js          # Main Express server
├── populate.js        # Script to seed the database
├── opengrid.db        # SQLite database file
├── public/            # Frontend static files
│   ├── index.html     # Main landing page
│   ├── login.html     # Admin login
│   ├── admin.html     # Admin dashboard
│   └── analytics.html # Issue analytics view
├── package.json
├── package-lock.json
└── node_modules/
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js (v18+ recommended)
* npm

### Steps

1. Clone the repository

   ```bash
   git clone <your-repo-url>
   cd opengrid-uk
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. (Optional) Populate the database with sample data

   ```bash
   node populate.js
   ```

4. Start the server

   ```bash
   node server.js
   ```

5. Open your browser and visit:

   ```
   http://localhost:3000
   ```

---

## 🧪 Available Pages

* `/` → Community reporting page
* `/login.html` → Admin login
* `/admin.html` → Admin dashboard
* `/analytics.html` → Analytics & risk overview

---

## 🔐 Responsible Design

* No unnecessary personal data is collected
* Reports focus on issues, not individuals
* Designed to highlight trends and risk rather than target users
* Suitable for future anonymisation and moderation layers

---

## 🌱 Future Improvements

* Role‑based authentication (community vs council)
* Sentiment analysis using AI
* Map‑based issue reporting
* Real‑time notifications
* Deployment to cloud infrastructure

---

## 🤝 Team & Credits

Built by students at Leeds Hack 2026 as a prototype for civic engagement and responsible technology.

---

## 📄 License

This project is for educational and hackathon use. Licensing can be added if the project is extended further.

---

**OpenGrid UK** – Making local issues visible, measurable, and impossible to ignore.
