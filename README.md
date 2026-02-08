# OpenGrid UK | The Civic Operating System

> **"Rebooting the System: Turning ignored complaints into visible action."**

**OpenGrid UK** is a modern civic debugging platform designed to replace outdated, unresponsive council reporting systems. Instead of reports disappearing into a "black box," OpenGrid visualizes city infrastructure issues in real-time, enforcing accountability through community visibility and data transparency.

![Status](https://img.shields.io/badge/Status-Online-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Stack](https://img.shields.io/badge/Tech-Node.js%20%7C%20SQLite-orange)

---

## ⚡ The Problem: System Failure
The current interface between the public and the government is broken.
- **Latency:** Critical issues like potholes, fly-tipping, and broken lights take weeks to process.
- **Opacity:** Citizens have no idea if their report was seen or the cost involved.
- **Disconnect:** Councils lack real-time, verified ground data to prioritize budgets effectively.

## 🚀 The Solution: A System Reboot
We are "rebooting" civic management by shifting the power dynamic. OpenGrid is a **public-driven operating system** for the city. It empowers citizens to maintain their own infrastructure while giving authorities the tools they need to act faster.

### Key Features

#### 🗺️ For the Public (The Frontend)
* **Visual Incident Mapping:** A real-time, interactive map where users can drop pins to report issues.
* **Evidence Locker:** Users upload visual evidence (images) which are stored and verified.
* **Community Validation:** A chat and upvote system allows locals to verify reports and hold authorities accountable.
* **Live Environmental Data:** Integrated weather and news feeds to provide context to infrastructure failures.

#### 📊 For the Council (The Admin Node)
* **Admin Dashboard:** A "CommandOS" view for officials to update statuses and dispatch crews.
* **Automated Costing:** The system automatically estimates repair costs (e.g., "£1,200 for Pothole") based on incident type.
* **Confidence Scoring:** AI-driven confidence scores (0.0 - 1.0) help agencies prioritize real reports over spam.

---

## 🛠️ Technology Stack

**Core Infrastructure:**
* **Runtime:** Node.js
* **Backend:** Express.js REST API
* **Database:** **SQLite3** (Relational, file-based storage for Users, Incidents, and Comments).
* **Frontend:** HTML5, TailwindCSS

**Integrations & APIs:**
* **Leaflet.js:** Open-source interactive mapping engine.
* **Open-Meteo API:** Real-time hyper-local weather data.
* **Highways England Data:** Ingests live unplanned event feeds (RSS).
* **BBC News Feeds:** Contextual local news integration.

---

## 📸 How It Works

1.  **Detect:** A citizen spots a hazard (e.g., a burst water main).
2.  **Deploy:** They drop a pin, upload a photo, and the system assigns a "Confidence Score."
3.  **Verify:** The community upvotes the issue and discusses severity in the chat.
4.  **Resolve:** Council Admins see the alert, dispatch a crew, and mark it "Resolved."
5.  **Audit:** The data page updates, showing the community exactly where their tax money went.

---

## 📦 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/YourUsername/OpenGridUK.git](https://github.com/YourUsername/OpenGridUK.git)
    cd OpenGridUK
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Initialize the Database**
    *Run this script to create the SQLite database and seed it with 50+ demo incidents.*
    ```bash
    node populate.js
    ```

4.  **Boot the System**
    ```bash
    node server.js
    ```

5.  **Access the Interface**
    * **Public View:** `http://localhost:3000/login.html`
    * **Admin Command:** `http://localhost:3000/admin.html`

---

## 🤝 Building Community Resilience
OpenGrid isn't just an app; it's a social contract. By making infrastructure data visible and accessible, we rewire the relationship between communities and service providers. It transforms passive residents into active nodes in the city's resilience network.

**Status:** `ONLINE` | **Version:** `2.0.0`
