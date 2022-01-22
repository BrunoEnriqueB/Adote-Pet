const Pet = require('../models/Pet');
//middlewares
const getUserByToken = require('../helpers/getUserByToken');
const getToken = require('../helpers/gettoken');

module.exports = class PetController {
  static async createPet(req, res) {
    const { name, age, weight, color } = req.body;
    const available = true;
    const images = req.files;

    if(!name) {
      return res.status(422).json({message: "informe o nome do pet!"});  
    }
    if(!age) {
      return res.status(422).json({message: "informe a idade do pet!"});  
    }
    if(!weight) {
      return res.status(422).json({message: "informe o pesodo pet!"});  
    }
    if(!color) {
      return res.status(422).json({message: "informe a cor do pet!"});  
    }
    if (images.length === 0) {
      return res.status(422).json({message: "imagens são obrigatórias!"});  
    }

    //get pet owner
    const token = await getToken(req)
    const user = await getUserByToken(token);
    
    //create a pet
    const pet = new Pet({
      name, 
      age, 
      weight, 
      color, 
      available, 
      images: [], 
      user: {
          _id: user.id,
          name: user.name,
          image: user.image,
          phone: user.phone
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    })  
    
    try {
      const newPet = await pet.save();
      return res.status(201).json({message: "pet cadastrado com sucesso!", newPet});
    } catch (error) {
      return res.status(500).json({message: error})
    }
  }
}