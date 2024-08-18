const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');


router.get('/', userController.getAllUsers);
router.post('/', userController.createUsers);
router.post('/login', userController.loginUser);
// router.get('/:id', userController.getUser);
// router.patch('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);



module.exports = router;