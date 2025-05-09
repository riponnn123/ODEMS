🎥 ODEMS - Online Department Event Management System
ODEMS is a smart web-based platform that allows faculty and students to manage academic events like Workshops, Meetings, Conferences, Alumni Talks, and more with ease. Designed specifically for Computer Science departments, it streamlines event creation, approval, and participation.

📈 Empowering departments to plan, finalize, and participate in academic events efficiently.

🔹 Live Demo (Coming Soon)

🚀 Full Stack Overview
The ODEMS platform includes:

* A **React-based frontend** for responsive UI.
* **Node.js + Express.js** backend for handling routes, authentication, and database queries.
* **MySQL** database for managing users, events, and participation.

🛠️ Tech Stack

* ✨ React
* 👁️ Axios
* 🤖 Express.js
* 📊 MySQL
* 🔐 JWT (Authentication)
* ☁️ CORS + Cookies for session persistence

📆 Features

* ✉️ Faculty Login/Registration
* 🔺 Create events with venue and date
* ✅ Admin approval of events
* 📅 Finalize approved events based on type
* 🌐 Event types: Meeting, Workshop, Conference
* ✏️ Add event-specific details (e.g., minutes, speakers)
* ☑️ Join & participate in upcoming events (faculty/students)
* 📈 Role-based dashboard views

📦 Installation & Setup

### Prerequisites

Make sure you have:

* Node.js (v16+)
* MySQL Server
* npm

### Steps

1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd odems
```

2️⃣ Install dependencies

```bash
cd server
npm install
cd ../client
npm install
```

3️⃣ Setup environment

* In `/server/.env`, add:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=odems
JWT_SECRET=your_jwt_secret
```

4️⃣ Run the project

```bash
# Start backend
cd server
npm run dev

# In another terminal, start frontend
cd ../client
npm run dev
```


🎓 Academic Use Cases

* Department event coordination
* Faculty-managed workshops
* Admin event oversight
* Student participation portal

👤 Roles

* **Admin**: Approves/monitors events
* **Faculty**: Creates and finalizes events
* **Student**: Participates in approved events

📢 Contributions Welcome
Open to improvements, features, and optimizations. PRs are welcome!

🚀 Start managing academic events the smarter way with **ODEMS**!
