const express = require('express');
const router = express.Router();
const {saveTravelAgentData} = require('../controllers/generalController');



router.get('/save-travel-agent-data',saveTravelAgentData)  

module.exports = router;