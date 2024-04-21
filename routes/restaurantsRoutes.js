const express = require('express');
const restaurantsController = require('../controllers/restaurantsController');
const router = express.Router();
const verifyRestaurantAccess = require('../middleware/verifyRestaurantAccess');
const verifyUserAuthentication= require('../middleware/verifyUserAuthentication');

// Endpoint Menus
router.get('/restaurants',verifyUserAuthentication, restaurantsController.getRestaurants);
router.get('/restaurants/:id',verifyUserAuthentication, restaurantsController.getRestaurantById);
router.post('/restaurants', restaurantsController.postRestaurants);
router.put('/restaurants',verifyRestaurantAccess, restaurantsController.putRestaurants);
router.delete('/restaurants', verifyRestaurantAccess, restaurantsController.deleteRestaurants);


module.exports = router;
