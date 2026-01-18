const Person = require('../models/Person');

// Create a new person
const createPerson = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      cnp,
      birthDate,
      birthPlace,
      nationality,
      idNumber,
      issueDate,
      expiryDate,
      idType,
      idPhoto,
    } = req.body;

    // Validation
    if (!firstName || !lastName || !cnp || !birthDate || !birthPlace || !nationality || !idNumber || !issueDate || !expiryDate) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate CNP format
    if (!/^\d{13}$/.test(cnp)) {
      return res.status(400).json({ message: 'CNP must be 13 digits' });
    }

    const person = new Person({
      userId: req.user.id,
      firstName,
      lastName,
      cnp,
      birthDate,
      birthPlace,
      nationality,
      idNumber,
      issueDate,
      expiryDate,
      idType,
      idPhoto,
    });

    await person.save();

    res.status(201).json({
      message: 'Person created successfully',
      person,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all persons for the current user
const getPersons = async (req, res) => {
  try {
    const persons = await Person.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single person
const getPerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);

    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    // Check if user owns this person
    if (person.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this person' });
    }

    res.json(person);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update person
const updatePerson = async (req, res) => {
  try {
    let person = await Person.findById(req.params.id);

    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    // Check if user owns this person
    if (person.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this person' });
    }

    // Update fields
    const allowedFields = [
      'firstName',
      'lastName',
      'cnp',
      'birthDate',
      'birthPlace',
      'nationality',
      'idNumber',
      'issueDate',
      'expiryDate',
      'idType',
      'idPhoto',
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        person[field] = req.body[field];
      }
    });

    person.updatedAt = Date.now();
    await person.save();

    res.json({
      message: 'Person updated successfully',
      person,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete person
const deletePerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);

    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    // Check if user owns this person
    if (person.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this person' });
    }

    await Person.findByIdAndDelete(req.params.id);

    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all persons (admin only)
const getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find().populate('userId', 'firstName lastName email');
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createPerson,
  getPersons,
  getPerson,
  updatePerson,
  deletePerson,
  getAllPersons,
};
