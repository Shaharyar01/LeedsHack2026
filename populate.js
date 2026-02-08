const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./opengrid.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the SQLite database.');
});

db.serialize(() => {
    // Comprehensive list of 50+ incidents across Leeds area
    const incidents = [
        { lat: 53.8008, lng: -1.5491, title: 'Pothole on City Square', desc: 'Large pothole causing traffic congestion', loc: 'City Square', type: 'critical', votes: 15, time: Date.now() - 3600000, confidence: 0.92, estimated_cost: '£1,200', authority: 'Leeds Highways' },
        { lat: 53.8045, lng: -1.5433, title: 'Traffic lights not working', desc: 'Lights at Junction 3 malfunction', loc: 'City Center', type: 'critical', votes: 28, time: Date.now() - 7200000, confidence: 0.88, estimated_cost: '£3,500', authority: 'Traffic Management' },
        { lat: 53.7975, lng: -1.5530, title: 'Broken street lamp', desc: 'Street lamp on Boar Lane is not functioning', loc: 'Boar Lane', type: 'news', votes: 5, time: Date.now() - 10800000, confidence: 0.76, estimated_cost: '£450', authority: 'Street Lighting' },
        { lat: 53.8110, lng: -1.5380, title: 'Road closure - Bridge works', desc: 'Crown Point Bridge closed for maintenance', loc: 'Crown Point', type: 'traffic', votes: 42, time: Date.now() - 14400000, confidence: 0.95, estimated_cost: '£85,000', authority: 'Infrastructure' },
        { lat: 53.8040, lng: -1.5570, title: 'Flooding reported', desc: 'Water pooling on Whitehall Road', loc: 'Whitehall Road', type: 'critical', votes: 11, time: Date.now() - 1800000, confidence: 0.84, estimated_cost: '£5,200', authority: 'Drainage Services' },
        { lat: 53.7935, lng: -1.5200, title: 'Bus stop shelter damaged', desc: 'Glass shelter at Armley Town Street damaged', loc: 'Armley', type: 'news', votes: 3, time: Date.now() - 5400000, confidence: 0.68, estimated_cost: '£2,800', authority: 'Public Transport' },
        { lat: 53.8122, lng: -1.5411, title: 'Speed camera installation', desc: 'New speed camera activated on Stainbeck Lane', loc: 'Stainbeck', type: 'news', votes: 8, time: Date.now() - 2700000, confidence: 0.91, estimated_cost: '£12,000', authority: 'Road Safety' },
        { lat: 53.7890, lng: -1.5600, title: 'Cycling path blocked', desc: 'Vegetation blocking the cycle path', loc: 'South Leeds', type: 'traffic', votes: 6, time: Date.now() - 9000000, confidence: 0.79, estimated_cost: '£650', authority: 'Parks & Leisure' },
        { lat: 53.8200, lng: -1.5300, title: 'Cracked pavement', desc: 'Dangerous uneven pavement on Meanwood Road', loc: 'Meanwood', type: 'critical', votes: 9, time: Date.now() - 8100000, confidence: 0.81, estimated_cost: '£2,100', authority: 'Leeds Highways' },
        { lat: 53.7850, lng: -1.5450, title: 'Missing manhole cover', desc: 'Open manhole on Domestic Road', loc: 'Domestic Road', type: 'critical', votes: 22, time: Date.now() - 5400000, confidence: 0.94, estimated_cost: '£800', authority: 'Utilities' },
        { lat: 53.8300, lng: -1.5200, title: 'Graffiti on bridge', desc: 'Large graffiti covering Stainbeck Bridge', loc: 'Stainbeck Bridge', type: 'news', votes: 2, time: Date.now() - 12600000, confidence: 0.55, estimated_cost: '£1,500', authority: 'Cleansing Services' },
        { lat: 53.7750, lng: -1.5600, title: 'Damaged bus shelter', desc: 'Bus shelter at Hunslet Lane vandalized', loc: 'Hunslet', type: 'news', votes: 4, time: Date.now() - 18000000, confidence: 0.62, estimated_cost: '£3,200', authority: 'Public Transport' },
        { lat: 53.8400, lng: -1.5100, title: 'Street sign missing', desc: 'Directional sign removed on Chapel Allerton', loc: 'Chapel Allerton', type: 'news', votes: 1, time: Date.now() - 20700000, confidence: 0.48, estimated_cost: '£350', authority: 'Street Services' },
        { lat: 53.7650, lng: -1.5800, title: 'Overgrown vegetation', desc: 'Trees blocking visibility at roundabout', loc: 'Belle Isle', type: 'traffic', votes: 7, time: Date.now() - 15300000, confidence: 0.73, estimated_cost: '£900', authority: 'Parks & Leisure' },
        { lat: 53.8150, lng: -1.4900, title: 'Malfunctioning traffic signal', desc: 'Red light stuck at Alwoodley Lane junction', loc: 'Alwoodley', type: 'critical', votes: 18, time: Date.now() - 4500000, confidence: 0.87, estimated_cost: '£2,800', authority: 'Traffic Management' },
        { lat: 53.7500, lng: -1.5500, title: 'Waterlogged road', desc: 'Persistent water on Stourton Lane', loc: 'Stourton', type: 'traffic', votes: 11, time: Date.now() - 6300000, confidence: 0.77, estimated_cost: '£3,800', authority: 'Drainage Services' },
        { lat: 53.8250, lng: -1.5550, title: 'Loose scaffolding', desc: 'Building scaffolding not secure', loc: 'Headingley', type: 'critical', votes: 32, time: Date.now() - 2700000, confidence: 0.89, estimated_cost: '£4,200', authority: 'Building Control' },
        { lat: 53.7550, lng: -1.4800, title: 'Pothole cluster', desc: 'Multiple potholes on Rothwell Lane', loc: 'Rothwell', type: 'critical', votes: 24, time: Date.now() - 7200000, confidence: 0.85, estimated_cost: '£5,600', authority: 'Leeds Highways' },
        { lat: 53.8350, lng: -1.5400, title: 'Air quality concern', desc: 'Diesel emissions from building site', loc: 'Woodhouse', type: 'news', votes: 6, time: Date.now() - 11700000, confidence: 0.64, estimated_cost: '£1,200', authority: 'Environmental Health' },
        { lat: 53.7600, lng: -1.5200, title: 'Sunken drain cover', desc: 'Uneven drain cover on Cross Gates Road', loc: 'Cross Gates', type: 'traffic', votes: 8, time: Date.now() - 8100000, confidence: 0.80, estimated_cost: '£1,400', authority: 'Utilities' },
        { lat: 53.8500, lng: -1.5000, title: 'Contaminated land', desc: 'Suspected chemical spill', loc: 'Bramhope', type: 'critical', votes: 19, time: Date.now() - 3600000, confidence: 0.86, estimated_cost: '£12,000', authority: 'Environmental Agency' },
        { lat: 53.7700, lng: -1.5700, title: 'Noise complaints', desc: 'Late night noise from construction', loc: 'Beeston', type: 'news', votes: 3, time: Date.now() - 13500000, confidence: 0.59, estimated_cost: '£0', authority: 'Environmental Health' },
        { lat: 53.8100, lng: -1.5600, title: 'Rogue trader warning', desc: 'Suspicious activity on Saville Mount', loc: 'Saville Mount', type: 'news', votes: 5, time: Date.now() - 16200000, confidence: 0.71, estimated_cost: '£0', authority: 'Trading Standards' },
        { lat: 53.7650, lng: -1.5400, title: 'Tree branches low', desc: 'Overhanging branches on Elland Road', loc: 'Elland Road', type: 'traffic', votes: 4, time: Date.now() - 17100000, confidence: 0.67, estimated_cost: '£750', authority: 'Parks & Leisure' },
        { lat: 53.8400, lng: -1.5600, title: 'Illegal parking', desc: 'Cars blocking fire hydrant on Clarendon Road', loc: 'Clarendon Road', type: 'news', votes: 2, time: Date.now() - 19800000, confidence: 0.54, estimated_cost: '£0', authority: 'Parking Enforcement' },
        { lat: 53.7750, lng: -1.5100, title: 'Slippery surface', desc: 'Ice formation on footpath', loc: 'Morley', type: 'critical', votes: 13, time: Date.now() - 2700000, confidence: 0.82, estimated_cost: '£200', authority: 'Street Services' },
        { lat: 53.8200, lng: -1.5700, title: 'Broken bollard', desc: 'Damaged protective bollard on Cookridge Street', loc: 'Cookridge Street', type: 'news', votes: 1, time: Date.now() - 21600000, confidence: 0.51, estimated_cost: '£400', authority: 'Street Services' },
        { lat: 53.7550, lng: -1.5700, title: 'Foul smell', desc: 'Persistent unpleasant odor near Middleton', loc: 'Middleton', type: 'news', votes: 8, time: Date.now() - 12600000, confidence: 0.65, estimated_cost: '£0', authority: 'Environmental Health' },
        { lat: 53.8350, lng: -1.5100, title: 'Dangerous debris', desc: 'Loose metal on Kirkby Road', loc: 'Kirkby Road', type: 'critical', votes: 16, time: Date.now() - 4500000, confidence: 0.83, estimated_cost: '£600', authority: 'Leeds Highways' },
        { lat: 53.7900, lng: -1.5800, title: 'Electrical hazard', desc: 'Exposed wiring near Tingley Road', loc: 'Tingley', type: 'critical', votes: 27, time: Date.now() - 1800000, confidence: 0.91, estimated_cost: '£3,400', authority: 'Utilities' },
        { lat: 53.8450, lng: -1.5300, title: 'Bike lane encroachment', desc: 'Parked cars in cycle lane on Otley Road', loc: 'Otley Road', type: 'traffic', votes: 9, time: Date.now() - 7200000, confidence: 0.75, estimated_cost: '£0', authority: 'Parking Enforcement' },
        { lat: 53.7600, lng: -1.5000, title: 'Abandoned vehicle', desc: 'Rusted car on Drighlington Lane', loc: 'Drighlington', type: 'news', votes: 3, time: Date.now() - 14400000, confidence: 0.63, estimated_cost: '£500', authority: 'Environmental Services' },
        { lat: 53.8000, lng: -1.5300, title: 'Paint spillage', desc: 'Paint dripping from building on Mill Road', loc: 'Mill Road', type: 'news', votes: 2, time: Date.now() - 18900000, confidence: 0.58, estimated_cost: '£800', authority: 'Environmental Health' },
        { lat: 53.8300, lng: -1.5800, title: 'Floodwater backup', desc: 'Water backing up after heavy rain', loc: 'Potternewton', type: 'critical', votes: 14, time: Date.now() - 3600000, confidence: 0.84, estimated_cost: '£4,100', authority: 'Drainage Services' },
        { lat: 53.7700, lng: -1.5900, title: 'Crumbling wall', desc: 'Old brick wall deteriorating near Cottingley', loc: 'Cottingley', type: 'critical', votes: 10, time: Date.now() - 5400000, confidence: 0.79, estimated_cost: '£7,200', authority: 'Building Control' },
        { lat: 53.8100, lng: -1.5000, title: 'Sunken kerb', desc: 'Uneven kerb on Weetwood Lane', loc: 'Weetwood', type: 'traffic', votes: 5, time: Date.now() - 10800000, confidence: 0.72, estimated_cost: '£1,100', authority: 'Leeds Highways' },
        { lat: 53.7800, lng: -1.5600, title: 'Dead trees', desc: 'Multiple dead trees in recreation ground', loc: 'Beeston Park', type: 'news', votes: 4, time: Date.now() - 16200000, confidence: 0.69, estimated_cost: '£2,400', authority: 'Parks & Leisure' },
        { lat: 53.8500, lng: -1.5600, title: 'Flyover damage', desc: 'Cracks in concrete on M1 flyover', loc: 'Outer Ring Road', type: 'critical', votes: 38, time: Date.now() - 1800000, confidence: 0.93, estimated_cost: '£65,000', authority: 'Highways England' },
        { lat: 53.7450, lng: -1.5300, title: 'Rat infestation', desc: 'Rats spotted near waste ground', loc: 'Swillington', type: 'news', votes: 7, time: Date.now() - 9000000, confidence: 0.74, estimated_cost: '£1,600', authority: 'Environmental Health' },
        { lat: 53.8250, lng: -1.5000, title: 'Hedge overgrowth', desc: 'Tall hedge blocking vision on Adel Lane', loc: 'Adel', type: 'traffic', votes: 6, time: Date.now() - 11700000, confidence: 0.70, estimated_cost: '£850', authority: 'Parks & Leisure' },
        { lat: 53.7550, lng: -1.4900, title: 'Damaged street sign', desc: 'Bent sign on Gildersome Lane', loc: 'Gildersome', type: 'news', votes: 1, time: Date.now() - 20700000, confidence: 0.52, estimated_cost: '£300', authority: 'Street Services' },
        { lat: 53.8200, lng: -1.5400, title: 'Asbestos concern', desc: 'Suspected asbestos in old building', loc: 'Burley', type: 'critical', votes: 21, time: Date.now() - 2700000, confidence: 0.88, estimated_cost: '£18,000', authority: 'Environmental Health' },
        { lat: 53.7700, lng: -1.5100, title: 'Bicycle theft ring', desc: 'Multiple bikes stolen from rack', loc: 'Morley Town Center', type: 'news', votes: 5, time: Date.now() - 12600000, confidence: 0.66, estimated_cost: '£0', authority: 'Police' },
        { lat: 53.8350, lng: -1.5700, title: 'Pipe corrosion', desc: 'Corroded water pipe leaking', loc: 'Meanwood Valley', type: 'critical', votes: 12, time: Date.now() - 4500000, confidence: 0.81, estimated_cost: '£3,800', authority: 'Water Authority' },
        { lat: 53.7900, lng: -1.5200, title: 'Sidewalk buckling', desc: 'Pavement lifting on Tingley Lane', loc: 'Tingley', type: 'traffic', votes: 8, time: Date.now() - 8100000, confidence: 0.78, estimated_cost: '£2,900', authority: 'Leeds Highways' },
        { lat: 53.8100, lng: -1.5800, title: 'Overgrown garden', desc: 'Abandoned property with wild vegetation', loc: 'Chapel Allerton', type: 'news', votes: 3, time: Date.now() - 14400000, confidence: 0.61, estimated_cost: '£2,200', authority: 'Environmental Services' },
        { lat: 53.7600, lng: -1.5600, title: 'Subsidence risk', desc: 'Sinking ground on Bank Street', loc: 'Bank Street', type: 'critical', votes: 19, time: Date.now() - 3600000, confidence: 0.86, estimated_cost: '£22,000', authority: 'Geological Survey' },
        { lat: 53.8450, lng: -1.5500, title: 'Fox sightings', desc: 'Urban fox activity near residential area', loc: 'Headingley Park', type: 'news', votes: 4, time: Date.now() - 15300000, confidence: 0.68, estimated_cost: '£1,000', authority: 'Wildlife Control' },
        { lat: 53.7750, lng: -1.5300, title: 'Gas leak suspected', desc: 'Smell of gas on Armley Road', loc: 'Armley', type: 'critical', votes: 25, time: Date.now() - 900000, confidence: 0.92, estimated_cost: '£2,000', authority: 'Gas Authority' },
        { lat: 53.8300, lng: -1.5000, title: 'Parking chaos', desc: 'Blockade of parking spaces at shopping area', loc: 'Bramhope Shopping', type: 'news', votes: 2, time: Date.now() - 19800000, confidence: 0.53, estimated_cost: '£0', authority: 'Parking Enforcement' }
    ];

    // Unique comments for each incident (cycling through)
    const commentTemplates = [
        [
            { text: 'Needs urgent attention!', time: Date.now() - 3000000 },
            { text: 'Already reported to council', time: Date.now() - 2400000 },
            { text: 'Very dangerous', time: Date.now() - 1800000 },
            { text: 'Hope it gets fixed soon', time: Date.now() - 1200000 }
        ],
        [
            { text: 'This is ridiculous', time: Date.now() - 3000000 },
            { text: 'How long will this take?', time: Date.now() - 2400000 },
            { text: 'Emergency repairs needed', time: Date.now() - 1800000 },
            { text: 'Public safety at risk', time: Date.now() - 1200000 }
        ],
        [
            { text: 'Not a priority', time: Date.now() - 3000000 },
            { text: 'Can wait until spring', time: Date.now() - 2400000 },
            { text: 'Minor issue', time: Date.now() - 1800000 },
            { text: 'Still works though', time: Date.now() - 1200000 }
        ],
        [
            { text: 'Major inconvenience', time: Date.now() - 3000000 },
            { text: 'Traffic chaos expected', time: Date.now() - 2400000 },
            { text: 'Use alternate route', time: Date.now() - 1800000 },
            { text: 'When will it reopen?', time: Date.now() - 1200000 }
        ],
        [
            { text: 'Environmental hazard', time: Date.now() - 3000000 },
            { text: 'Water needs treatment', time: Date.now() - 2400000 },
            { text: 'Health risk to kids', time: Date.now() - 1800000 },
            { text: 'Immediate action required', time: Date.now() - 1200000 }
        ]
    ];

    let commentIndex = 0;
    incidents.forEach((incident, index) => {
        db.run(`INSERT INTO bugs (lat, lng, title, desc, loc, type, votes, time, confidence, estimated_cost, authority) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [incident.lat, incident.lng, incident.title, incident.desc, incident.loc, incident.type, incident.votes, incident.time, incident.confidence, incident.estimated_cost, incident.authority],
            function(err) {
                if (err) console.error(err.message);
                const bugId = this.lastID;
                
                // Cycle through comment templates
                const comments = commentTemplates[commentIndex % commentTemplates.length];
                commentIndex++;
                
                comments.forEach((comment) => {
                    db.run(`INSERT INTO comments (bug_id, username, text, time) VALUES (?, ?, ?, ?)`,
                        [bugId, 'anonymous', comment.text, comment.time],
                        (err) => {
                            if (err) console.error(err.message);
                        }
                    );
                });

                console.log(`Added incident: ${incident.title} with ID: ${bugId}`);
            }
        );
    });
});

setTimeout(() => {
    db.close((err) => {
        if (err) console.error(err.message);
        console.log('Database population complete! Total incidents added: 50+');
    });
}, 3000);
