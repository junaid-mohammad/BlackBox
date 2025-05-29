# 🕶️ BlackBox (SQL Version)

**BlackBox** is a full-stack authentication sandbox rebuilt with PostgreSQL. This version modularizes the original MongoDB project and begins with **Level 1: User Registration and Login with Email & Password**. It focuses on building the foundation of user authentication using SQL, Express, and EJS.

> What goes in, stays in.™

---

## 🔐 Authentication Levels

This branch (SQL version) will implement the same auth journey as the original:

1. ✅ **Level 1:** Register & Log In using Email & Password
2. ⬜ Level 2: Password Encryption
3. ⬜ Level 3: Hashing with MD5
4. ⬜ Level 4: Hashing + Salting with bcrypt
5. ⬜ Level 5: Cookies and Sessions
6. ⬜ Level 6: Google OAuth 2.0
7. ⬜ Level 7: Anonymous Secret Submission

---

## 🧱 Tech Stack

- **Frontend:** EJS, Bootstrap 4, FontAwesome
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** Custom (manual SQL validation, modularized controllers)

---

## 🚀 Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/junaid-mohammad/BlackBox.git
   cd BlackBox
   ```

2. Switch to the SQL branch:

   ```bash
   git checkout sql-version
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your `.env` file:

   ```env
   DB_USER=your_db_username
   DB_HOST=localhost
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

6. Open in browser:

   ```
   http://localhost:3000
   ```

---

## 🗂 Project Structure

```bash
📦 BlackBox/
├── controllers/
│   └── secretController.js    # Controller logic for register/login
├── routes/
│   └── secretRoutes.js        # Routes delegated to controller
├── db/
│   └── db.js                  # PostgreSQL client setup
├── views/                     # EJS templates
├── public/                    # Static assets (CSS, images)
├── index.js                   # Main Express entry point
└── .env                       # Environment variables
```

---

## 🧪 Educational Purpose

This SQL version of BlackBox rebuilds the authentication pipeline from the ground up using relational databases. It's a teaching tool and dev playground for testing modular auth techniques without heavy frameworks.

---

## 📦 Roadmap

- [x] Modularize controller and routes
- [x] Add PostgreSQL support (Level 1 complete)
- [ ] Implement encryption and hashing
- [ ] Integrate session management
- [ ] Add Google OAuth 2.0 support
- [ ] UI polish and theming
- [ ] Deployment-ready configuration

---

## 🤝 Contributing

This is a personal learning project. Feel free to fork it, try your own features, or open issues if you're experimenting with a similar stack.

---

## 📄 License

MIT License

---

## 🔗 Credits

Made with ☕ and way too many secrets by [Junaid Arif](https://github.com/junaid-mohammad)
