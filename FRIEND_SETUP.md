# Person Management App - Setup Guide for Friend

This is a full-stack application with React frontend, Node.js backend, and MongoDB database.

## 📋 Prerequisites

Before starting, make sure you have:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **A text editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

## 🚀 Quick Start (3 Steps)

### Step 1: Clone the Repository
```bash
git clone https://github.com/antonioiugaa/person-management.git
cd person-management
```

### Step 2: Setup Backend
```bash
cd gestiune-persoane-backend

# Create .env file with database credentials
# Create a new file named ".env" in gestiune-persoane-backend folder with this content:
```
PORT=5000
MONGODB_URI=mongodb+srv://toni:u3vumc9il5xbs4B@clusterweb2026.r8qn7xy.mongodb.net/gestione-persoane?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

# Install dependencies
npm install

# Start the backend server
node server.js
# You should see: "Server running on port 5000" and "MongoDB connected successfully"
```

### Step 3: Setup Frontend (in a new terminal)
```bash
cd gestiune-persoane

# Install dependencies
npm install

# Start the React app
npm start
# Browser should open to http://localhost:3000 automatically
```

## 📚 Demo Accounts

Use these credentials to log in:

| Email | Password |
|-------|----------|
| ioan@example.com | password123 |
| maria@example.com | password123 |
| andrei@example.com | password123 |
| elena@example.com | password123 |
| mihai@example.com | password123 |
| ana@example.com | password123 |
| demo@example.com | password123 |

All 7 demo users come pre-loaded with sample person records in the database.

## 🛠️ Project Structure

```
person-management/
├── gestiune-persoane/                 # React Frontend
│   ├── src/
│   │   ├── pages/                     # Page components
│   │   ├── components/                # Reusable components
│   │   ├── context/                   # React Context (AuthContext)
│   │   └── styles/                    # CSS files
│   ├── package.json
│   └── public/
│
├── gestiune-persoane-backend/         # Node.js Backend
│   ├── models/                        # MongoDB schemas (User, Person)
│   ├── routes/                        # API routes
│   ├── server.js                      # Main server file
│   ├── .env                          # Environment variables (NOT in git)
│   ├── package.json
│   ├── seedDatabase.js               # Script to populate DB with demo users
│   └── createDemoUser.js             # Script to create single demo user
│
└── README.md                          # Project documentation
```

## 🔧 Available Scripts

### Backend
```bash
cd gestiune-persoane-backend

# Start development server (uses nodemon for auto-restart)
npm run dev

# Start production server
node server.js

# Populate database with 7 demo users
node seedDatabase.js

# Create a single demo user
node createDemoUser.js
```

### Frontend
```bash
cd gestiune-persoane

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🔑 Features

✅ **User Authentication**
- Register new accounts
- Login with JWT tokens
- Secure password hashing with bcryptjs
- Session persistence in localStorage

✅ **Person Management**
- Create, read, update, delete persons
- Each person linked to a user
- Real-time updates

✅ **Modern UI**
- Responsive design with Bootstrap 5
- Ultra-modern animations and gradients
- Clean, professional interface
- Mobile-friendly

## 🗄️ Database

The app uses **MongoDB Atlas** (cloud database) - no local installation needed!

- **Database**: `gestione-persoane`
- **Collections**: 
  - `users` - User accounts and authentication
  - `persons` - Person records

Connection string is already configured in `.env`

## 🐛 Troubleshooting

### "MongoDB connection refused"
- Check internet connection
- Verify `.env` file has correct MONGODB_URI
- Make sure MongoDB Atlas cluster is active

### "Port 5000 already in use"
```bash
# Kill the process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### "npm: command not found"
- Node.js is not installed or not in PATH
- Reinstall Node.js and restart terminal

### Frontend can't connect to backend
- Make sure backend is running on port 5000
- Check CORS is enabled in `server.js`
- Try `http://localhost:5000/api/auth/login` in browser

## 📱 How to Use

1. **Register**: Create a new account with email and password
2. **Login**: Use your credentials or demo accounts above
3. **Add Person**: Click "Add New Person" button on dashboard
4. **View**: See all your persons in the list
5. **Edit**: Click on a person card to edit details
6. **Delete**: Remove persons from your list
7. **Logout**: Click logout button in header

## 🔒 Security Notes

- `.env` file is NOT committed to git (contains sensitive data)
- Never share the MONGODB_URI publicly
- Change JWT_SECRET in production
- Passwords are hashed with bcryptjs

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Make sure both servers are running (backend + frontend)
3. Clear browser cache and restart both servers
4. Check browser console for error messages

---

**Happy coding!** 🎉
