const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();

// Endpoint GET /api/customers
router.get('/customers', customerController.creerCustomer);


// Endpoint GET /api/customers/:id
router.get('/customers/:id', customerController.getCustomerParId);

module.exports = router;
