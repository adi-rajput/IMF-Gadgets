const express = require('express');
const { registerAgent , loginAgent } = require('../controllers/agent_controller');
const router = express.Router();

router.post('/register', registerAgent);
router.post('/login', loginAgent);
module.exports = router;
