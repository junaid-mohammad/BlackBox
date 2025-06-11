# 🕶️ BlackBox (SQL Version)

> _What goes in, stays in._

[![Deployed via GitHub Actions](https://img.shields.io/badge/Deployed%20via-GitHub%20Actions-blue?logo=github)](https://github.com/junaid-mohammad/BlackBox)
[![Azure App Service](https://img.shields.io/badge/Hosted%20on-Azure%20App%20Service-brightgreen)](https://blackbox-d6g2c2dycya8fgbs.canadacentral-01.azurewebsites.net/)
[![Azure DevOps](https://img.shields.io/badge/Tracked%20in-Azure%20DevOps-blue)](https://dev.azure.com/Junaid-Arif/BlackBox)

**BlackBox (SQL Version)** is a full-stack authentication playground built to showcase modern authentication flows and security practices using **Node.js**, **Express**, and **PostgreSQL**.
Originally a MongoDB project, it has been fully re-architected to use relational data storage with **Azure PostgreSQL Flexible Server** and **Azure App Service** for deployment.
The app walks through seven levels of authentication challenges, from basic username/password logins to OAuth 2.0 integration and user-generated secret submissions. Each level reinforces concepts like hashing, salting, session security, and modular architecture — making it a robust playground for both learning and demonstrating secure authentication patterns.

---

## 🗺️ Live Application

👉 **[BlackBox App](https://blackbox-d6g2c2dycya8fgbs.canadacentral-01.azurewebsites.net/)**
👉 **[GitHub Repository](https://github.com/junaid-mohammad/BlackBox)**
👉 **[Azure DevOps Project](https://dev.azure.com/Junaid-Arif/BlackBox)**

---

## 🎯 Purpose

**BlackBox (SQL Version)** was created to explore and master secure authentication techniques within a full-stack environment.
The goal was to build a learning-focused playground that not only demonstrates core authentication concepts, but also integrates best practices for modular architecture, database security, and user experience.

This project:

- **Reinforces security fundamentals** through hands-on implementation of encryption, hashing, and session-based login.
- **Practices modular backend design** by separating routes, controllers, and database interactions for clarity and maintainability.
- **Simulates real-world scenarios** with multi-layered authentication, user data management, and external OAuth integration.
- **Provides a testbed** for learning how to connect relational databases to modern Node.js applications.

The journey from a MongoDB-based sandbox to a fully-fledged PostgreSQL-powered application taught me everything from **SQL queries** and **hashing pitfalls** to **OAuth 2.0 best practices** and **secure session handling** — all while deploying to **Azure App Service**.

---

## 🔐 Authentication Levels

This SQL branch of **BlackBox** tackles authentication step by step:

1. ✅ **Level 1: Register & Log In using Email & Password**

   - Simple form-based authentication with PostgreSQL storage.
   - Validates credentials and logs in the user — no hashing yet.

2. ✅ **Level 2: Encryption & Hashing Concepts**

   - Explored why passwords shouldn’t be encrypted (need a key) and should be **hashed** instead.
   - Learned about symmetric vs. asymmetric encryption, hashing (MD5, SHA), and brute force risks.
   - No actual encryption code here — purely conceptual, to build a foundation.

3. ✅ **Level 3: Hashing and Salting with bcrypt**

   - Implemented `bcrypt` hashing and 10 rounds of salting.
   - Passwords stored as irreversible hashes — no plain text anywhere.
   - Validated passwords during login with `bcrypt.compare`.

4. ✅ **Level 4: Sessions and Cookies with Passport**

   - Integrated `express-session` for session management and cookie handling.
   - Added `passport-local` strategy for secure username/password login.
   - Configured `serializeUser` and `deserializeUser` to store and retrieve user session data.

5. ✅ **Level 5: Environment Variables & Security**

   - Stored all sensitive data (DB credentials, API keys) in `.env` and Azure App Settings.
   - Learned how environment variables boost both security and scalability.
   - No code changes needed as the project already used `.env` — confirmed best practices.

6. ✅ **Level 6: Google OAuth 2.0 Authentication**

   - Added social login with Google using `passport-google-oauth2`.
   - Configured routes for Google’s OAuth flow: `/auth/google` and callback.
   - Google profile data securely stored and integrated with local user sessions.

7. ✅ **Level 7: Anonymous Secret Submission**

   - Created a separate `secrets` table for storing multiple secrets per user.
   - Users can add **many** secrets anonymously (instead of overwriting).
   - Secrets are displayed only to the logged-in user, ensuring privacy and ownership.

---

## 💻 Tech Stack

- **Frontend:**

  - **EJS** for dynamic, server-side rendering
  - **Bootstrap 4** for responsive styling
  - **FontAwesome** for rich iconography

- **Backend:**

  - **Node.js** runtime environment
  - **Express.js** for fast, minimalist web server routing
  - **bcrypt** for secure password hashing
  - **passport** and **passport-google-oauth2** for modular authentication

- **Database:**

  - **PostgreSQL** — relational database for robust data management
  - Queries and schema designed for multi-secret support and secure credential storage

- **Deployment & Hosting:**

  - **Azure App Service** — scalable cloud hosting platform
  - **Azure PostgreSQL Flexible Server** for secure, managed database hosting
  - **Environment variables** managed through `.env` locally and **Azure App Settings** in production
  - **GitHub Actions** for continuous deployment (CD) to Azure

---

## 🧠 What I Learned

This project was a deep dive into **authentication best practices**, **secure user data handling**, and **scalable, cloud-ready deployment**.
Here’s what stood out:

- How to **modularize** a Node.js application for maintainability:
  separating routes, controllers, DB logic, and Passport config into clean files.
- The difference between **encryption** (reversible) and **hashing** (one-way) — why hashing is key for passwords.
- **Salting** with bcrypt to strengthen password security and defeat rainbow table attacks.
- The role of **sessions** and **cookies** in authenticating users and preserving state.
- Integrating **OAuth 2.0** (Google) in real-world login flows and storing third-party profiles securely.
- How to manage **environment variables** across local and cloud environments for both **security** and **flexibility**.
- Cloud deployment challenges: configuring environment-specific DB connections, enabling SSL in production, and using **Azure App Service** with a **PostgreSQL Flexible Server** backend.
- The value of **iterative learning** — each level built on the last, reinforcing how real-world authentication systems evolve.

---

## 🚀 Deployment & Workflow

The app is deployed on **Azure App Service** with a **PostgreSQL Flexible Server** for persistent data storage. Local development uses a `.env` file to store environment-specific credentials, while **Azure App Settings** handle production secrets securely.

Automated deployments are powered by **GitHub Actions**. Pushing to the `sql-version` branch triggers workflows that build and deploy the app directly to Azure, ensuring smooth CI/CD pipelines.

For detailed instructions on setting up the Azure PostgreSQL Flexible Server (firewall, SSL, psql commands), see the [**Deployment Section in Capitalism**](https://github.com/junaid-mohammad/Capitalism#-deployment--workflow).

---

### 🛠️ Getting Started

To **run BlackBox locally** or replicate this setup:

1. **Clone the repo:**

   ```bash
   git clone https://github.com/junaid-mohammad/BlackBox.git
   cd BlackBox
   ```

2. **Switch to the SQL branch:**

   ```bash
   git checkout sql-version
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up your `.env` file** (for local or Azure Postgres Flexible Server):

   ```env
   DB_USER=your_db_username
   DB_HOST=your_db_host
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   SESSION_SECRET=your_random_session_secret
   CLIENT_ID=your_google_client_id
   CLIENT_SECRET=your_google_client_secret
   CALLBACK_URL=your_google_client_callback_url
   ```

5. **Create the PostgreSQL database tables:**

   ```sql
   -- users table
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL
   );

   -- secrets table
   CREATE TABLE secrets (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id),
     content TEXT
   );
   ```

6. **Start the server locally:**

   ```bash
   npm run dev
   ```

7. **Visit in browser:**

   ```
   http://localhost:3000
   ```

---

## ☁️ Hosting & Infrastructure

- **Hosting:**

  - **Azure App Service** serves the Node.js + EJS app, handling both static and dynamic routes.
  - **Azure PostgreSQL Flexible Server** stores user credentials and secrets.

- **Production SSL:**

  - SSL is **enforced** in production, ensuring encrypted connections to the database:

    ```js
    ssl: process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false;
    ```

---

## ⚙️ Local & Cloud Environments

- **Local:**

  - `.env` file contains credentials for local Postgres.
  - No SSL is enforced in dev mode.

- **Production:**

  - Azure securely manages environment variables.
  - SSL is **automatically required** for secure DB connections.

---

Got it! Here’s the **corrected section**:

---

## 🔁 CI/CD and Azure DevOps Integration

- **GitHub Actions:**
  Pushing to the `main` branch triggers automated deployment to **Azure App Service** via **GitHub Actions**. This ensures continuous delivery of updates and consistent deployment practices.

- **Azure DevOps:**
  Configured as a secondary remote for **redundancy and future pipeline integration** (no active pipelines in use):

  ```bash
  git remote add azure https://Junaid-Arif@dev.azure.com/Junaid-Arif/BlackBox/_git/BlackBox
  git push azure main
  ```

---

## 🧪 Database Management

The app uses two core tables:

1. **users table:**

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL
   );
   ```

2. **secrets table:**

   ```sql
   CREATE TABLE secrets (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id),
     content TEXT
   );
   ```

No additional migrations or seeders were needed — just initial table setup. For detailed Azure PostgreSQL provisioning, see the [**Capitalism Deployment Guide**](https://github.com/junaid-mohammad/Capitalism#-deployment--workflow).

---

## 🗂 Project Structure

```bash
📦 BlackBox/
├── config/
│   └── passport.js            # All Passport strategies and session config
├── controllers/
│   └── secretController.js    # Controller logic for user authentication and secret handling
├── routes/
│   └── secretRoutes.js        # Routes delegated to the controller
├── db/
│   └── db.js                  # PostgreSQL client setup (with SSL for production)
├── views/                     # EJS templates for all dynamic pages
├── public/                    # Static assets (CSS, images, client-side JS)
├── index.js                   # Main Express entry point and app configuration
├── .env                       # Local environment variables (Azure App Settings used in production)
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

---

## 🤝 Contribution

**BlackBox** is a personal learning project — designed to explore modern authentication flows, relational database integration, and full-stack deployment pipelines. If you’d like to fork it, replicate the stack, or build on it, please do! Contributions are welcome for:

- UI/UX improvements
- Additional authentication flows (e.g., social logins beyond Google)
- Deployment optimizations
- Additional features like password reset flows or admin panels

---

## 📄 License

This project is licensed under the **MIT License** — open-source and freely available for others to use, learn from, or expand upon.

---

## 🔗 Credits

- Originally a learning exercise to understand authentication workflows with **PostgreSQL**, **Node.js**, and **Express**.
- Modular design and deployment practices inspired by my earlier projects like **Capitalism** and **Todo Or Not Todo**.
- Created with ☕, 🔥, and a lot of enthusiasm by [**Junaid Arif**](https://github.com/junaid-mohammad), and deployed using **Azure App Service** and **GitHub Actions**.

---
