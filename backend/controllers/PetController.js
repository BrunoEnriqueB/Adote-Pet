const Pet = require('../models/Pet');

//middlewares
const getUserByToken = require('../helpers/getUserByToken');
const getToken = require('../helpers/gettoken');
const ObjectId = require('mongoose').Types.ObjectId;
const { update } = require('../models/Pet');

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
      return res.status(422).json({message: "informe o peso do pet!"});  
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

  static async getAll(req, res) {
    const pets = await Pet.find().sort('+createdAt');

    res.status(200).json(pets)
  } 

  static async getMyPets(req, res) {
    const token = await getToken(req);
    const user = await getUserByToken(token);
    
    const userId = ObjectId(user._id).toString();

    const pets = await Pet.find({'user._id': userId});

    return res.status(200).json({pets,})


  }

  static async getMyAllAdoptedPets(req, res) {
    const token = await getToken(req);
    const user = await getUserByToken(token);
     
    const pets = await Pet.find({'adopter._id': user._id});

    return res.status(200).json({pets})
  }

  static async getPetById(req, res) {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
      return res.status(422).json({message: "Id inválido!"});
    }
    const pet = await Pet.findById(id);
    if(!pet) {
      return res.status(404).json({message: "Não encontrado!"});
    }

    return res.status(201).json(pet);
  }

  static async removePetById(req, res) {
    const id = await req.params.id;
    //check if id is valid
    if(!ObjectId.isValid(id)) {
      return res.status(422).json({message: "Id inválido!"});
    }
    //check if pet exist
    const pet = await Pet.findById(id);
    if(!pet) {
      return res.status(404).json({message: "Não encontrado!"});
    }
    
    const token = await getToken(req);
    const user = await getUserByToken(token);
    // check if logged in user registered the pet
    if(pet.user._id.toString() !== user._id.toString()) {
      return res.status(422).json({message: "Não autorizado!"});
    }

    await Pet.findByIdAndRemove(id);
    return res.status(200).json({message: "Pet deletado com sucesso!"});
  }

  static async updatePetById(req, res) {
    const id = req.params.id;
    //check if id is valid
    if(!ObjectId.isValid(id)) {
      return res.status(422).json({message: "Id inválido!"});
    }
    
    const pet = await Pet.findById(id);
    if(!pet) {
      return res.status(404).json({message: "Não encontrado!"});
    }

    const token = await getToken(req);
    const user = await getUserByToken(token);

    if(user._id.toString() !== pet.user._id.toString()) {
      return res.status(422).json({message: "Não autorizado!"});
    }

    const { name, age, weight, color, available } = req.body;

    const image = req.files

    let updatedData = {};

    if(!name) {
      return res.status(422).json({message: "informe o nome do pet!"});  
    }
    updatedData.name = name;
    if(!age) {
      return res.status(422).json({message: "informe a idade do pet!"});  
    }
    updatedData.age = age;
    if(!weight) {
      return res.status(422).json({message: "informe o peso do pet!"});  
    }
    updatedData.weight = age;
    if(!color) {
      return res.status(422).json({message: "informe a cor do pet!"});  
    }
    updatedData.color = color;
    if(image.length === 0) {
      return res.status(422).json({message: "as imagens do pet são obrigatórias!"});  
    } else {
      updatedData.image = [];
      image.map((image) => {
        updatedData.image.push(image.filename);
      });
    }

    if(pet.adopter) {
      return res.status(422).json({message: "Você não pode editar esse pet, pois ele já foi adotado!"});  
    }

    await Pet.findByIdAndUpdate(id, updatedData);

    res.status(200).json({message: "Pet atualizado com sucesso!"})
  }
}