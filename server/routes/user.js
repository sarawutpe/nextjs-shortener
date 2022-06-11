const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// get user
router.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findOne({ where: { id: id } });
    res.json({ ok: true, data: result });
  } catch (error) {
    res.json({ ok: false, data: error.name });
  }
});

// update user
router.put('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.update(req.body, {
      where: { id: id },
    });
    if (result[0]) {
      res.json({ ok: true, data: 'Profile updated' });
    } else {
      res.json({ ok: false, data: '' });
    }
  } catch (error) {
    res.json({ ok: false, data: error.name });
  }
});

// update password
router.put('/user/password/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { currentPassword, newPassword } = req.body;
    // check current password
    const findUser = await User.findOne({ where: { id: id } });
    const comparePassword = bcrypt.compareSync(currentPassword, findUser.password);
    if (comparePassword) {
      // hash new password
      const hashPassword = bcrypt.hashSync(newPassword, 10);
      const result = await User.update(
        { password: hashPassword },
        {
          where: { id: id },
        }
      );
      if (result[0]) {
        res.json({ ok: true, data: 'Password has been updated' });
      }
    } else {
      res.json({ ok: false, data: 'Invalid current password' });
    }
  } catch (error) {
    res.json({ ok: false, data: error.name });
  }
});

module.exports = router;
