require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Person = require('./models/Person');

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gestiune-persoane';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Person.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const users = [
      { firstName: 'Ioan', lastName: 'Popescu', email: 'ioan@example.com', password: 'password123' },
      { firstName: 'Maria', lastName: 'Ionescu', email: 'maria@example.com', password: 'password123' },
      { firstName: 'Andrei', lastName: 'Mihai', email: 'andrei@example.com', password: 'password123' },
      { firstName: 'Elena', lastName: 'Georgescu', email: 'elena@example.com', password: 'password123' },
      { firstName: 'Mihai', lastName: 'Stanescu', email: 'mihai@example.com', password: 'password123' },
      { firstName: 'Ana', lastName: 'Cristescu', email: 'ana@example.com', password: 'password123' },
      { firstName: 'Demo', lastName: 'User', email: 'demo@example.com', password: 'password123' },
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Person data
    const personsData = [
      {
        userId: createdUsers[0]._id,
        firstName: 'Ioan',
        lastName: 'Popescu',
        cnp: '1850515123456',
        birthDate: '1985-05-15',
        birthPlace: 'București',
        nationality: 'Română',
        idNumber: 'AB123456',
        issueDate: '2020-01-10',
        expiryDate: '2030-01-10',
        idType: 'Buletin de identitate',
      },
      {
        userId: createdUsers[1]._id,
        firstName: 'Maria',
        lastName: 'Ionescu',
        cnp: '2900720456789',
        birthDate: '1990-07-20',
        birthPlace: 'Cluj-Napoca',
        nationality: 'Română',
        idNumber: 'AB234567',
        issueDate: '2019-06-15',
        expiryDate: '2029-06-15',
        idType: 'Pasaport',
      },
      {
        userId: createdUsers[2]._id,
        firstName: 'Andrei',
        lastName: 'Mihai',
        cnp: '1880310123789',
        birthDate: '1988-03-10',
        birthPlace: 'Timișoara',
        nationality: 'Română',
        idNumber: 'AB345678',
        issueDate: '2021-03-20',
        expiryDate: '2031-03-20',
        idType: 'Permis de conducere',
      },
      {
        userId: createdUsers[3]._id,
        firstName: 'Elena',
        lastName: 'Georgescu',
        cnp: '2870805654321',
        birthDate: '1987-08-05',
        birthPlace: 'Iași',
        nationality: 'Română',
        idNumber: 'AB456789',
        issueDate: '2018-09-12',
        expiryDate: '2028-09-12',
        idType: 'Buletin de identitate',
      },
      {
        userId: createdUsers[4]._id,
        firstName: 'Mihai',
        lastName: 'Stanescu',
        cnp: '1920422987654',
        birthDate: '1992-04-22',
        birthPlace: 'Constanța',
        nationality: 'Română',
        idNumber: 'AB567890',
        issueDate: '2022-02-14',
        expiryDate: '2032-02-14',
        idType: 'Pasaport',
      },
      {
        userId: createdUsers[5]._id,
        firstName: 'Ana',
        lastName: 'Cristescu',
        cnp: '2860612321098',
        birthDate: '1986-06-12',
        birthPlace: 'Brașov',
        nationality: 'Română',
        idNumber: 'AB678901',
        issueDate: '2020-11-08',
        expiryDate: '2030-11-08',
        idType: 'Buletin de identitate',
      },
      {
        userId: createdUsers[6]._id,
        firstName: 'Radu',
        lastName: 'Popescu',
        cnp: '1950812456123',
        birthDate: '1995-08-12',
        birthPlace: 'Ploiești',
        nationality: 'Română',
        idNumber: 'AB789012',
        issueDate: '2021-07-01',
        expiryDate: '2031-07-01',
        idType: 'Permis de conducere',
      },
    ];

    const createdPersons = await Person.insertMany(personsData);
    console.log(`✅ Created ${createdPersons.length} persons`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nYou can login with any of these accounts:');
    users.forEach(user => {
      console.log(`  - ${user.email} / password123`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
