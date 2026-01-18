# 🚀 Setup Guide for Friend's Laptop

## Quick Start (5 minutes)

### Prerequisites
- **Node.js** v14+ installed ([Download here](https://nodejs.org/))
- **MongoDB Atlas account** (free) ([Sign up here](https://www.mongodb.com/cloud/atlas))

### Step 1: Clone/Copy the Project
Copy the entire `sitereact` folder to your friend's laptop.

### Step 2: Set Up MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (default settings are fine)
4. Go to **Database Access** → Create database user with username/password
5. Go to **Network Access** → Add your IP (or allow all: 0.0.0.0/0)
6. Click **Connect** → Choose **Drivers** → **Node.js**
7. Copy the connection string

### Step 3: Update Backend .env
Edit `gestiune-persoane-backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/gestione-persoane?retryWrites=true&w=majority
JWT_SECRET=super-secret-key-change-this-in-production
NODE_ENV=development
```

Replace:
- `USERNAME` with your MongoDB Atlas username
- `PASSWORD` with your MongoDB Atlas password
- Keep the cluster name from your connection string

### Step 4: Install Dependencies

**Backend:**
```powershell
cd gestiune-persoane-backend
npm install
```

**Frontend:**
```powershell
cd gestiune-persoane
npm install
```

### Step 5: Start Everything

**Terminal 1 - Backend:**
```powershell
cd gestiune-persoane-backend
node server.js
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

**Terminal 2 - Frontend:**
```powershell
cd gestiune-persoane
npm start
```

Browser should open at `http://localhost:3000`

### Step 6: Login
Use demo credentials:
- **Email**: `demo@example.com`
- **Password**: `password123`

---

## Troubleshooting

### "MongoDB connection error: bad auth"
→ Check your MongoDB Atlas credentials in `.env`
→ Make sure your IP is whitelisted in Network Access

### "Port 5000 already in use"
→ Kill existing process: `Get-Process node | Stop-Process -Force`
→ Or change PORT in `.env`

### "npm: command not found"
→ Node.js not installed. Download from https://nodejs.org/

### "Cannot find module"
→ Run `npm install` in the folder again

---

## Features
✅ Add/Edit/Delete persons
✅ Search by name, CNP, ID number
✅ Upload ID photos
✅ Copy personal data to clipboard
✅ User authentication with login/logout
✅ Real MongoDB database
✅ Responsive design

---

## Need Help?
Check the backend terminal for error messages!
