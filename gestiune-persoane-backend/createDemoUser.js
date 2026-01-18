require('dotenv').config();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const User = require('./models/User');

async function createDemoUser() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gestiune-persoane';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ email: 'demo@example.com' });
    if (existingUser) {
      console.log('Demo user already exists');
      process.exit(0);
    }

    // Create demo user
    const user = new User({
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@example.com',
      password: 'password123',
      role: 'user'
    });

    await user.save();
    console.log('✅ Demo user created successfully!');
    console.log('Email: demo@example.com');
    console.log('Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Error creating demo user:', error);
    process.exit(1);
  }
}

createDemoUser();
