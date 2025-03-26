const express = require('express');
const router = express.Router();
const dummyUser = { email: 'annie@gmail.com', password: '123456', name: 'Qurat ul Ain' };
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === dummyUser.email && password === dummyUser.password) {
    return res.status(200).json({ user: dummyUser });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
