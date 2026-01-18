# Gestiune Persoane - Full Stack Application

A complete full-stack person management application built with **React + Node.js + MongoDB**.

## Features

### Frontend (React)
- ✅ **Authentication System**: Login/Register with JWT tokens
- ✅ **Component Architecture**: Organized into reusable components
- ✅ **React Hooks**: `useEffect` for API calls and `useMemo` for filtering
- ✅ **Person Management**: CRUD operations for managing persons
- ✅ **Search Functionality**: Filter by name, CNP, or ID number
- ✅ **Image Upload**: Upload and store ID document photos
- ✅ **Form Validation**: Complete validation with error messages
- ✅ **Responsive Design**: Beautiful Bootstrap-based UI
- ✅ **Copy to Clipboard**: Export personal data as formatted text

### Backend (Node.js + Express)
- ✅ **REST API**: RESTful endpoints for all operations
- ✅ **Authentication**: JWT-based authentication
- ✅ **Database**: MongoDB for data persistence
- ✅ **User System**: User registration and login
- ✅ **CRUD Operations**: Full CRUD functionality for persons
- ✅ **Authorization**: User isolation (users can only see their own data)
- ✅ **Admin Features**: Admin can view all users and persons
- ✅ **Error Handling**: Comprehensive error handling and validation

## Project Structure

```
sitereact/
├── gestiune-persoane/                 # React Frontend
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── Header.js
│   │   │   ├── PersonList.js
│   │   │   ├── PersonDetails.js
│   │   │   ├── PersonModal.js
│   │   │   ├── DeleteConfirmModal.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context/                  # React Context (Authentication)
│   │   │   └── AuthContext.js
│   │   ├── pages/                    # Page components
│   │   │   ├── AuthPage.js          # Login/Register
│   │   │   └── DashboardPage.js     # Main dashboard
│   │   ├── styles/                   # CSS files for components
│   │   ├── utils/                    # Utility functions
│   │   │   └── api.js               # API calls
│   │   ├── App.js                   # Main app with routing
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   ├── .env                          # Frontend environment variables
│   └── README.md
│
└── gestiune-persoane-backend/        # Node.js Backend
    ├── models/                       # Mongoose schemas
    │   ├── User.js
    │   └── Person.js
    ├── controllers/                  # Route controllers
    │   ├── authController.js
    │   └── personController.js
    ├── routes/                       # API routes
    │   ├── authRoutes.js
    │   └── personRoutes.js
    ├── middleware/                   # Express middleware
    │   └── auth.js                   # JWT authentication
    ├── server.js                     # Main server file
    ├── .env                          # Backend environment variables
    ├── package.json
    └── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

```bash
cd gestiune-persoane-backend

# Install dependencies
npm install

# Create .env file (already created)
# Configure MONGODB_URI if using MongoDB Atlas:
#   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gestiune-persoane

# Start the server
npm start

# For development with auto-reload:
npm install nodemon --save-dev
npm run dev
```

Server runs on: `http://localhost:5000`

### Frontend Setup

```bash
cd gestiune-persoane

# Install dependencies
npm install

# Create .env file (already created)
# Verify REACT_APP_API_URL=http://localhost:5000/api

# Start the development server
npm start

# Build for production
npm run build
```

App runs on: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/users` - Get all users (admin only)

### Persons
- `POST /api/persons` - Create new person (protected)
- `GET /api/persons` - Get all persons for user (protected)
- `GET /api/persons/:id` - Get single person (protected)
- `PUT /api/persons/:id` - Update person (protected)
- `DELETE /api/persons/:id` - Delete person (protected)
- `GET /api/persons/admin/all` - Get all persons (admin only)

## Authentication

The application uses **JWT (JSON Web Tokens)** for authentication:

1. User registers or logs in
2. Backend returns JWT token
3. Token is stored in localStorage
4. Token is sent with each request in Authorization header
5. Protected routes verify token validity

### Demo Credentials
You can create your own account or use demo data once you set up the database.

## Database Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  createdAt: Date
}
```

### Person Model
```javascript
{
  userId: ObjectId (reference to User),
  firstName: String,
  lastName: String,
  cnp: String (13 digits),
  birthDate: Date,
  birthPlace: String,
  nationality: String,
  idNumber: String,
  issueDate: Date,
  expiryDate: Date,
  idType: String,
  idPhoto: String (base64),
  createdAt: Date,
  updatedAt: Date
}
```

## Key React Hooks Used

### useEffect
- Fetches persons data on component mount
- Updates person list after CRUD operations
- Handles authentication state on app load

### useMemo
- Filters person list based on search term (optimized performance)
- Prevents unnecessary re-renders during filtering

### useCallback
- Memoizes callback functions to prevent unnecessary child re-renders
- Used for copy, delete, and edit operations

## Styling

- **Bootstrap 5**: Main CSS framework
- **React Icons**: Icon library for consistent iconography
- **Custom CSS**: Component-specific styling in `/src/styles/`
- **Gradient Design**: Modern gradient backgrounds and accents
- **Responsive**: Mobile-first responsive design

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Protected routes on frontend
- ✅ API endpoint authorization
- ✅ User data isolation
- ✅ Input validation (frontend and backend)
- ✅ CORS enabled

## Development Tips

### Adding New Features
1. Create component in `src/components/`
2. Create page in `src/pages/` if needed
3. Add styles in `src/styles/`
4. Create API function in `src/utils/api.js`
5. Integrate in relevant pages/components

### Database Connection Issues
If MongoDB connection fails:
1. Ensure MongoDB is running (if local): `mongod`
2. Check MONGODB_URI in `.env`
3. Verify firewall settings (if using MongoDB Atlas)
4. Check connection string format

### API Debugging
Use tools like:
- **Postman**: Test API endpoints
- **Thunder Client**: VS Code extension
- **curl**: Command-line testing

Example:
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Performance Optimizations

- `useMemo` for expensive filtering operations
- `useCallback` to prevent unnecessary re-renders
- Lazy loading of components (if needed)
- Code splitting in build process
- Optimized images and assets

## Future Enhancements

- [ ] Admin dashboard with analytics
- [ ] Bulk operations (export/import)
- [ ] Advanced search and filtering
- [ ] Document verification
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Dark mode
- [ ] PDF export functionality
- [ ] Audit logging
- [ ] User management interface

## Troubleshooting

### Port Already in Use
```bash
# Frontend (3000)
PORT=3001 npm start

# Backend (5000)
# Edit .env: PORT=5001
```

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

### API Connection Errors
- Ensure backend is running
- Check REACT_APP_API_URL is correct
- Verify CORS settings
- Check browser console for errors

## License

This project is created for educational purposes.

## Support

For issues and questions, refer to the code comments and documentation in each file.

---

**Built with ❤️ using React, Node.js, Express, and MongoDB**
