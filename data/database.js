const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database already initialized');
    return callback(null, database);
  }

  const mongoUri = process.env.MONGO_URL;
  
  if (!mongoUri) {
    return callback(new Error('MONGO_URL not configured'));
  }

  MongoClient.connect(mongoUri)
    .then((client) => {
      database = client;
      console.log('Connected to MongoDB');
      callback(null, database);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = { initDb, getDatabase };