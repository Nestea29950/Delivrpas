const express = require('express');
const deliverymanController = require('../controllers/deliverymanController');
const router = express.Router();
const verifyUserAuthentication= require('../middleware/verifyUserAuthentication');
const verifyDeliveryManAccess= require('../middleware/verifyDeliveryManAccess');

// Endpoint Menus
router.get('/deliveryman',verifyUserAuthentication, deliverymanController.getdeliveryman);
router.post('/deliveryman', deliverymanController.postdeliveryman);
router.put('/deliveryman',verifyDeliveryManAccess, deliverymanController.putdeliveryman);
router.delete('/deliveryman',verifyDeliveryManAccess, deliverymanController.deletedeliveryman);


module.exports = router;
