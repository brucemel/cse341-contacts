const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  //#swagger.tags=['contacts']
  try {
    const result = await mongodb
      .getDatabase()
      .db('contacts')
      .collection('contacts')
      .find()
      .toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  //#swagger.tags=['contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db('contacts')
      .collection('contacts')
      .findOne({ _id: contactId });
    
    if (!result) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST
const createContact = async (req, res) => {
  //#swagger.tags=['contacts']
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ 
        error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday' 
      });
    }

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDatabase()
      .db('contacts')
      .collection('contacts')
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to create contact' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT
const updateContact = async (req, res) => {
  //#swagger.tags=['contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDatabase()
      .db('contacts')
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Contact not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteContact = async (req, res) => {
  //#swagger.tags=['contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    
    const response = await mongodb
      .getDatabase()
      .db('contacts')
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};