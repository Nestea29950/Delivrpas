const express = require('express');
const menusController = require('../controllers/menusController');
const router = express.Router();
const verifyRestaurantAccess = require('../middleware/verifyRestaurantAccess');
const verifyUserAuthentication= require('../middleware/verifyUserAuthentication');

// Endpoint Menus
router.get('/menus',verifyUserAuthentication, menusController.getmenus);
router.post('/menus',verifyRestaurantAccess, menusController.postmenus);
router.put('/menus/:id',verifyRestaurantAccess, menusController.putmenus);
router.delete('/menus/:id',verifyRestaurantAccess, menusController.deletemenus);


module.exports = router;
