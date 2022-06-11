const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({ where: { username: username } });
    // user not empty
    if (findUser) {
      const comparePassword = bcrypt.compareSync(password, findUser?.password);
      if (comparePassword) {
        const data = {
          id: findUser.id,
          username: findUser.username,
          name: findUser.name,
          email: findUser.email,
          createdAt: findUser.createdAt,
          updatedAt: findUser.updatedAt,
        };
        res.json({ ok: true, data: data });
      } else {
        res.json({ ok: false, data: 'Incorrect username or password' });
      }
    } else {
      res.json({ ok: false, data: 'Incorrect username or password' });
    }
  } catch (error) {
    res.json({ ok: false, data: error.message });
  }
});

module.exports = router;
