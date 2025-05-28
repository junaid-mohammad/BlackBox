# BlackBox 🕶️

**BlackBox** is a full-stack authentication sandbox where users can register, log in, and anonymously submit secrets — safely tucked away in a digital vault. It was originally built with MongoDB and demonstrates various authentication methods, from basic credentials to OAuth 2.0.

> What goes in, stays in.™

---

## 🔐 Features

BlackBox implements and showcases multiple authentication layers:

1. **Basic Username + Password**
2. **Password Encryption**
3. **MD5 Hashing** (for demo/legacy understanding)
4. **Hashing + Salting with bcrypt**
5. **Session Management with Passport.js**
6. **Google OAuth 2.0**
7. **Anonymous Secret Submission**

---

## 🧱 Tech Stack

- **Frontend:** EJS, Bootstrap 4, FontAwesome
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** Passport.js, Google OAuth
- **Sessions:** express-session

---

## 🚀 Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/junaid-mohammad/BlackBox.git
   cd BlackBox
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your `.env` file:

   ```env
   CLIENT_ID=your-google-oauth-client-id
   CLIENT_SECRET=your-google-oauth-client-secret
   ```

4. Start the server:

   ```bash
   node app.js
   ```

5. Navigate to:

   ```
   http://localhost:3000
   ```

---

## 🧪 Educational Purpose

BlackBox was originally built to learn and demonstrate secure user authentication patterns from the ground up. It now serves as a showcase of how login systems evolve and how different tools and practices layer together.

---

## 📦 Upcoming Plans

- [ ] PostgreSQL refactor (SQL branch)
- [ ] UI improvements and theming options
- [ ] Dark mode toggle
- [ ] Add email/password recovery demo

---

## 🤝 Contributing

This is a personal learning project, but feel free to fork it or create issues if you’re testing out similar stacks.

---

## 📄 License

MIT License

---

Made with ☕ and way too many secrets by [Junaid Arif](https://github.com/junaid-mohammad)
