const express = require('express');
const deliveriesController = require('../controllers/deliveriesController');
const router = express.Router();
const verifyUserAuthentication= require('../middleware/verifyUserAuthentication');

// Endpoint Menus
router.get('/deliveries',verifyUserAuthentication, deliveriesController.getdeliveries);
router.post('/deliveries',verifyUserAuthentication, deliveriesController.postdeliveries);
router.delete('/deliveries/:id',verifyUserAuthentication, deliveriesController.deletedeliveries);


module.exports = router;
