const express = require('express');
const restaurantsController = require('../controllers/restaurantsController');
const router = express.Router();


// Endpoint Menus
router.get('/restaurants', restaurantsController.getRestaurants);
router.post('/restaurants', restaurantsController.postRestaurants);
router.put('/restaurants/:id', restaurantsController.putRestaurants);
router.delete('/restaurants/:id', restaurantsController.deleteRestaurants);


module.exports = router;
