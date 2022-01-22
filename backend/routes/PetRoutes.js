const router = require('express').Router();
const PetController = require('../controllers/PetController');

//middlewares
const verifyToken = require('../helpers/verifyToken');
const { imageUpload } = require('../helpers/uploadimage');

router.post(
  '/create',
  verifyToken,
  imageUpload.array('image'), //diferente do que usamos para o avatar do usuário, aqui vamos usar o método array(), já que nele podemos mandar múltiplas imagens
  PetController.createPet);

module.exports = router;