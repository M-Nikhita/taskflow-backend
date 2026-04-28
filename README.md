# TaskFlow — Backend API 🚀

Express + MongoDB REST API with JWT authentication for the TaskFlow todo application.

## 🌐 Live API
`https://taskflow-backend-pvby.onrender.com`

## 🛠️ Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- express-rate-limit
- CORS + dotenv

## 📁 Folder Structure
```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Register & Login logic
│   └── todoController.js  # CRUD logic
├── middleware/
│   └── authMiddleware.js  # JWT verification
├── models/
│   ├── User.js            # User schema (bcrypt pre-save hook)
│   └── Todo.js            # Todo schema
├── routes/
│   ├── authRoutes.js      # /api/auth — rate limited + validated
│   └── todoRoutes.js      # /api/todos — all protected
├── .env.example
└── server.js
```

## 📝 API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/todos` | ✅ | Get all todos for logged-in user |
| POST | `/api/todos` | ✅ | Create a new todo |
| PUT | `/api/todos/:id` | ✅ | Update todo |
| DELETE | `/api/todos/:id` | ✅ | Delete todo |
| GET | `/api/health` | ❌ | Health check |

## 🔒 Security
- Passwords hashed with **bcrypt** (salt rounds: 10)
- JWT tokens expire in **7 days**
- Auth routes **rate limited** — max 10 requests per 15 minutes
- All todo routes scoped by `userId` — users can only access their own data

## ⚙️ Local Setup

### 1. Clone & install
```bash
git clone https://github.com/M-Nikhita/taskflow-backend.git
cd taskflow-backend
npm install
```

### 2. Configure environment
Create a `.env` file (use `.env.example` as template):
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Run
```bash
node server.js
```

Server runs on `http://localhost:5000`

## 🚀 Deployment
Deployed on **Render** (free tier).
- Build command: `npm install`
- Start command: `node server.js`
- Environment variables set in Render dashboard
