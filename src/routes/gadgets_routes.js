const express = require('express');
const { addGadget , getAllGadgets} = require('../controllers/gadget_controlleer');
const { authenticateAgent } = require('../middlewares/agent_authentication');
const router = express.Router();

router.post('/add', authenticateAgent, addGadget);
router.get('/', getAllGadgets);

module.exports = router;