const express = require('express');
const deliveriesController = require('../controllers/deliveriesController');
const router = express.Router();


// Endpoint Menus
router.get('/deliveries', deliveriesController.getdeliveries);
router.post('/deliveries', deliveriesController.postdeliveries);
router.delete('/deliveries/:id', deliveriesController.deletedeliveries);


module.exports = router;
