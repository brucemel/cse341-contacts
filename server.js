if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

mongodb.initDb((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Database connected successfully');
    app.use('/', require('./routes'));
  }
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});