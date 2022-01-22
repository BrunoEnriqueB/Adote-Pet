const router = require('express').Router();
const UserController = require('../controllers/UserController')

//midleware
const verifyToken = require('../helpers/verifyToken.js');
const { imageUpload } = require('../helpers/uploadimage');

router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/checkuser', UserController.checkUser);
router.get('/:id', UserController.getUserById);
router.patch('/edit/:id', //rota
              verifyToken, // autentica o token
              imageUpload.single('image'), // .single significa que pega uma única imagem e o campo que vai ser enviado do formulário se chama image
              UserController.editUser);

module.exports = router;