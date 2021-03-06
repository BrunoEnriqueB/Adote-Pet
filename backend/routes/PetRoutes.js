const router = require('express').Router();
const PetController = require('../controllers/PetController');

//middlewares
const verifyToken = require('../helpers/verifyToken');
const { imageUpload } = require('../helpers/uploadimage');

router.get('/mypets', verifyToken, PetController.getMyPets);
router.get('/adoptedpets', verifyToken, PetController.getMyAllAdoptedPets);
router.patch('/schedule/:id', verifyToken, PetController.schedule);
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption);
router.patch('/:id', verifyToken, imageUpload.array('image'), PetController.updatePetById);
router.delete('/:id', verifyToken, PetController.removePetById);
router.get('/:id', PetController.getPetById);
router.post(
  '/create',
  verifyToken,
  imageUpload.array('image'), //diferente do que usamos para o avatar do usuário, aqui vamos usar o método array(), já que nele podemos mandar múltiplas imagens
  PetController.createPet);
router.get('/', PetController.getAll);

module.exports = router;