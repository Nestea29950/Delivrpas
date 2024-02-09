const express = require('express');
const menusController = require('../controllers/menusController');
const router = express.Router();


// Endpoint Menusff
router.get('/menus', menusController.getmenus);
router.post('/menus/:id', menusController.postmenus);
router.put('/menus/:id', menusController.putmenus);
router.delete('/menus/:id', menusController.deletemenus);


module.exports = router;
