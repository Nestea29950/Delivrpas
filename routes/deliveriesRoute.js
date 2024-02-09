const express = require('express');
const deliveriesController = require('../controllers/deliveriesController');
const router = express.Router();


// Endpoint Menus
router.get('/deliveries', deliveriesController.getdeliveries);
router.post('/deliveries/:id', deliveriesController.postdeliveries);
router.put('/deliveries/:id', deliveriesController.putdeliveries);
router.delete('/deliveries/:id', deliveriesController.deletedeliveries);


module.exports = router;
