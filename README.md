# 🕶️ BlackBox (SQL Version)

**BlackBox** is a full-stack authentication sandbox rebuilt with PostgreSQL. This version modularizes the original MongoDB project and begins with **Level 1: User Registration and Login with Email & Password**. It focuses on building the foundation of user authentication using SQL, Express, and EJS.

> What goes in, stays in.™

---

## 🔐 Authentication Levels

This branch (SQL version) currently covers:

1. ✅ **Level 1: Register & Log In using Email & Password**

   - Basic user registration and login forms, with data stored in PostgreSQL.
   - Validates email and password, stores them directly (no hashing yet).

2. ✅ **Level 2: Encryption & Hashing Concepts**

   - Learned about encryption (Caesar Cipher, AES-256) and why encryption isn’t ideal for password storage (it requires a reversible key).
   - Explored symmetric vs. asymmetric encryption, encryption keys, and decryption.
   - Learned about hashing (MD5, SHA), how hash functions are one-way and irreversible, and the weaknesses of MD5 (rainbow tables, brute force).
   - No code implemented for this level — it’s a conceptual deep dive to inform future work.

3. ✅ **Level 3: Hashing with bcrypt**

   - Implemented password hashing with bcrypt and 10 rounds of salting.
   - Used `bcrypt.hash` to securely hash user passwords before storing them in the database.
   - Used `bcrypt.compare` to validate user passwords during login.
   - This provides better security and protection against common dictionary and hash table attacks.

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
- [x] Document encryption and hashing basics (Level 2)
- [ ] Implement hashing in the next level (MD5, bcrypt)
- [ ] Integrate session management
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
