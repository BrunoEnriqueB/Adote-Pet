const router = require('express').Router();
const UserController = require('../controllers/UserController')

//midleware
const verifyToken = require('../helpers/verifyToken.js');

router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/checkuser', UserController.checkUser);
router.get('/:id', UserController.getUserById);
router.patch('/edit/:id', verifyToken, UserController.editUser)

module.exports = router;