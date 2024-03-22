const express = require('express');
const customersController = require('../controllers/customersController');
const router = express.Router();
const verifyUserAuthentication= require('../middleware/verifyUserAuthentication');
const verifyCustomerAccess= require('../middleware/verifyCustomerAccess');

// Endpoint Menus
router.get('/customers',verifyUserAuthentication, customersController.getcustomers);
router.post('/customers', customersController.postcustomers);
router.put('/customers',verifyCustomerAccess, customersController.putcustomers);
router.delete('/customers',verifyCustomerAccess, customersController.deletecustomers);


module.exports = router;
