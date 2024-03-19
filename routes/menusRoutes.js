const express = require('express');
const menusController = require('../controllers/menusController');
const router = express.Router();


// Endpoint Menus
router.get('/menus', menusController.getmenus);
router.post('/menus', menusController.postmenus);
router.put('/menus/:id', menusController.putmenus);
router.delete('/menus/:id', menusController.deletemenus);


module.exports = router;
