const express = require('express');
const customersController = require('../controllers/customersController');
const router = express.Router();


// Endpoint Menus
router.get('/customers', customersController.getcustomers);
router.post('/customers/', customersController.postcustomers);
router.put('/customers/:id', customersController.putcustomers);
router.delete('/customers/:id', customersController.deletecustomers);


module.exports = router;
