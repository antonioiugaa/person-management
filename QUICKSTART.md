# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: MongoDB Setup

#### Option A: Local MongoDB
```bash
# Download and install MongoDB from https://www.mongodb.com/try/download/community
# Then run:
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `.env` in `gestiune-persoane-backend/`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gestiune-persoane
```

### Step 2: Start Backend

```bash
cd gestiune-persoane-backend
npm install
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

### Step 3: Start Frontend

In a new terminal:
```bash
cd gestiune-persoane
npm install
npm start
```

Expected output:
```
Compiled successfully!
You can now view gestiune-persoane in the browser.
Local: http://localhost:3000
```

### Step 4: Access Application

Open browser and go to: **http://localhost:3000**

## 📝 Create First Account

1. Click **"Register"** tab
2. Fill in:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: password123
   - Confirm Password: password123
3. Click **Register**
4. You'll be redirected to dashboard

## ➕ Add First Person

1. Click **"Adauga Persoana"** button
2. Fill in the form:
   - Name: Ioan Popescu
   - CNP: 1900101123456 (must be 13 digits)
   - Birth Date: 1990-01-01
   - Birth Place: Bucuresti
   - Nationality: Romana
   - ID Number: RE123456
   - Issue Date: 2015-05-10
   - Expiry Date: 2030-05-10
3. Optionally upload an ID photo
4. Click **"Adauga Persoana"**

## 🔍 Features to Try

### Search
- Type in search box to find by name, CNP, or ID number
- Results update in real-time

### View Details
- Click any person in the list to see full details
- Details panel shows all information
- Shows expiry status with badges

### Edit Person
- Click pencil icon or "Editeaza" button
- Modify any field
- Save changes

### Delete Person
- Click trash icon or "Sterge" button
- Confirm deletion in dialog
- Person is removed from list

### Copy Data
- Select a person
- Click "Copiaza Date Personale"
- Personal data copied to clipboard as formatted text
- Notification appears

### Upload ID Photo
- When adding/editing person
- Click file input
- Select image
- Preview shows before saving

## 🔐 Logout

- Click your name in top right
- Click "Logout"
- Redirected to login page

## 📊 Admin Features

Admin users can:
- View all users (GET /api/auth/users)
- View all persons (GET /api/persons/admin/all)

To create admin user, modify backend code or use MongoDB directly:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🆘 Troubleshooting

### "Cannot connect to backend"
- [ ] Backend is running on port 5000? (npm start in gestiune-persoane-backend)
- [ ] .env file correct? (REACT_APP_API_URL=http://localhost:5000/api)
- [ ] MongoDB running?

### "Database connection error"
- [ ] MongoDB is running? (mongod)
- [ ] MONGODB_URI correct in .env?
- [ ] Network connection stable?

### "Port 3000/5000 already in use"
```bash
# Kill process on port 5000:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port:
PORT=3001 npm start
```

### "Form validation errors"
- [ ] CNP must be exactly 13 digits
- [ ] All required fields (*) must be filled
- [ ] Dates must be valid format

## 📚 Learn More

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Bootstrap Docs](https://getbootstrap.com/docs)

## 🎉 You're Ready!

The application is now fully functional. Enjoy managing persons!

---

**Need help?** Check the main README.md for more detailed information.
