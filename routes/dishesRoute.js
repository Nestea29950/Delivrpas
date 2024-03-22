const express = require('express');
const dishesController = require('../controllers/dishesController');
const router = express.Router();
const verifyRestaurantAccess = require('../middleware/verifyRestaurantAccess');
const verifyUserAuthentication= require('../middleware/verifyUserAuthentication');


// Endpoint Menus
router.get('/dishes',verifyUserAuthentication, dishesController.getdishes);
router.post('/dishes',verifyRestaurantAccess, dishesController.postdishes);
router.put('/dishes/:id',verifyRestaurantAccess, dishesController.putdishes);
router.delete('/dishes/:id',verifyRestaurantAccess, dishesController.deletedishes);


module.exports = router;
