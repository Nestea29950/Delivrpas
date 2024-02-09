const express = require('express');
const dishesController = require('../controllers/dishesController');
const router = express.Router();


// Endpoint Menus
router.get('/dishes', dishesController.getdishes);
router.post('/dishes/:id', dishesController.postdishes);
router.put('/dishes/:id', dishesController.putdishes);
router.delete('/dishes/:id', dishesController.deletedishes);


module.exports = router;
