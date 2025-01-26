const express = require('express');
const { addGadget  , updateGadget , getGadgetsByStatus , getAllGadgets} = require('../controllers/gadget_controlleer');
const { authenticateAgent } = require('../middlewares/agent_authentication');
const router = express.Router();

router.post('/add', authenticateAgent, addGadget);
router.get('/', getAllGadgets);
router.get('/status', getGadgetsByStatus);
router.patch('/:gadgetId', authenticateAgent, updateGadget);
module.exports = router;