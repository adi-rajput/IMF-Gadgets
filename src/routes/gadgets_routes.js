const express = require('express');
const { addGadget } = require('../controllers/gadget_controlleer');
const { authenticateAgent } = require('../middlewares/agent_authentication');
const router = express.Router();

router.post('/add', authenticateAgent, addGadget);

module.exports = router;