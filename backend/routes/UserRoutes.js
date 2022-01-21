const router = require('express').Router();
const UserController = require('../controllers/UserController')

router.post('/register', UserController.createUser);

router.post('/login', UserController.loginUser);

router.get('/checkuser', UserController.checkUser);

module.exports = router;