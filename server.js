if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Database connected successfully');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});