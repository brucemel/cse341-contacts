const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags=['hello world]
  res.send('CSE 341 - Contacts API');
});

router.use('/contacts', require('./contacts'));

module.exports = router;
