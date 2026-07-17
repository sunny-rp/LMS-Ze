# 📚 Library Management System - Backend

A secure and scalable RESTful API for a **Library Management System** built with **Node.js, Express.js, MongoDB, and Mongoose**. The system supports authentication, role-based authorization, book management, borrowing/returning books, OTP verification, password recovery, email notifications, and Cloudinary image uploads.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- Email OTP Verification
- Secure Login & Logout
- JWT Authentication
- HttpOnly Cookie Authentication
- Forgot Password
- Reset Password
- Update Password
- User Profile

### 👥 User Management
- Admin Registration
- Get All Users (Admin)
- Role-Based Authorization
- Protected Routes

### 📚 Book Management
- Add New Book (Admin)
- Delete Book (Admin)
- Get All Books
- Book Availability Management
- Book Image Upload using Cloudinary

### 📖 Borrow Management
- Record Borrowed Book
- Return Borrowed Book
- View Borrowed Books
- Borrow History
- Automatic Due Date Handling
- Email Reminder Support (Node Cron + Nodemailer)

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Cookie Parser
- Express File Upload
- Cloudinary
- Nodemailer
- Node Cron
- CORS
- Dotenv

---

# 📂 Project Structure

```
backend/
│
├── config/
│   └── config.env
│
├── controllers/
│   ├── auth.controller.js
│   ├── book.controller.js
│   ├── borrowbook.controller.js
│   └── user.controller.js
│
├── DB/
│   └── db.js
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── catchAsyncErrors.js
│   └── errorMiddleware.js
│
├── models/
│   ├── user.model.js
│   ├── book.model.js
│   └── borrowbook.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── book.routes.js
│   ├── borrow.router.js
│   └── user.routes.js
│
├── utils/
│   ├── emailTemplates.js
│   └── sendEmail.js
│
├── app.js
├── server.js
└── package.json
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/library-management-system.git
```

```bash
cd backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment File

Create a **config/config.env**

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET_KEY=your_secret_key
JWT_EXPIRES=7d

COOKIE_EXPIRE=7

FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLIENT_NAME=your_cloud_name
CLOUDINARY_CLIENT_API=your_api_key
CLOUDINARY_CLIENT_SECRET=your_api_secret

SMTP_HOST=
SMTP_PORT=
SMTP_SERVICE=
SMTP_MAIL=
SMTP_PASSWORD=
```

---

## Run Development Server

```bash
npm run dev
```

Server starts at

```
http://localhost:5000
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Access |
|----------|-----------------------------------|----------|
| POST | /api/v1/auth/register | Public |
| POST | /api/v1/auth/verify-otp | Public |
| POST | /api/v1/auth/login | Public |
| POST | /api/v1/auth/logout | User |
| GET | /api/v1/auth/user-profile | User |
| POST | /api/v1/auth/password/forgot | Public |
| PUT | /api/v1/auth/password/reset/:token | Public |
| POST | /api/v1/auth/update-password | User |

---

## Books

| Method | Endpoint | Access |
|----------|-----------------------------------------|-----------|
| POST | /api/v1/book/admin/add-book | Admin |
| GET | /api/v1/book/get-all-books | User |
| DELETE | /api/v1/book/admin/delete-book/:id | Admin |

---

## Borrow Books

| Method | Endpoint | Access |
|----------|------------------------------------------------|-----------|
| GET | /api/v1/borrow/my-borrowed-books | User |
| POST | /api/v1/borrow/record-borrowed-book/:bookId | Admin |
| PUT | /api/v1/borrow/return-borrowed-book/:bookId | Admin |
| GET | /api/v1/borrow/borrowed-books-by-users | Admin |

---

## Users

| Method | Endpoint | Access |
|----------|--------------------------------------|----------|
| GET | /api/v1/user/all-users | Admin |
| POST | /api/v1/user/add/new-admin | Admin |

---

# 🔒 Authentication

The application uses:

- JWT Tokens
- HttpOnly Cookies
- Protected Routes
- Role-Based Authorization (Admin/User)

---

# 📧 Email Features

- OTP Verification
- Forgot Password Email
- Password Reset Email
- Borrow Reminder Emails
- Due Date Notifications

---

# ☁️ Cloudinary Integration

Cloudinary is used for storing and managing book cover images securely.

---

# 📅 Cron Jobs

Node Cron is integrated to automate reminder emails for users before the due date of borrowed books.

---

# 👨‍💻 Author

**Sunny Prajapat**

Software Developer | MERN Stack Developer

- JavaScript
- React.js
- Node.js
- Express.js
- MongoDB

---

# 📜 License

This project is licensed under the MIT License.

---

## ⭐ If you found this project helpful, don't forget to give it a Star on GitHub!
