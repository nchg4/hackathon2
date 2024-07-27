// routes/index.js
const express = require('express');
const router = express.Router();
const { getHome, postPlan } = require('../controllers/planController.js');

router.get('/', getHome);
router.post('/plan', postPlan);

module.exports = router;
