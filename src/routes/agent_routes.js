const express = require('express');
const { registerAgent } = require('../controllers/agent_controller');
const router = express.Router();

router.post('/register', registerAgent);

module.exports = router;
