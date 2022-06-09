const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const jwt = require('../jwt');

// login
router.get('/login', (req, res) => {
  try {
    res.json({ok: 'ok'});
  } catch (error) {}
});

module.exports = router;
