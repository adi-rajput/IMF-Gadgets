const express = require('express');
const { registerAgent , loginAgent , logoutAgent } = require('../controllers/agent_controller');
const router = express.Router();

router.post('/register', registerAgent);
router.post('/login', loginAgent);
router.post('/logout', logoutAgent);
module.exports = router;
