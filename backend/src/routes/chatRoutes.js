const express = require('express');
const { chatWithSquad } = require('../controllers/chatController');
const router = express.Router();

router.post('/message', chatWithSquad);

module.exports = router;