const express = require('express');
const deliverymanController = require('../controllers/deliverymanController');
const router = express.Router();


// Endpoint Menus
router.get('/deliveryman', deliverymanController.getdeliveryman);
router.post('/deliveryman/:id', deliverymanController.postdeliveryman);
router.put('/deliveryman/:id', deliverymanController.putdeliveryman);
router.delete('/deliveryman/:id', deliverymanController.deletedeliveryman);


module.exports = router;
