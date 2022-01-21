const User = require('../models/User');
const { Pet } = require('../models/Pet');

module.exports = class UserController {
  static createUser = async (req, res) => {
    try {
      const { name, email, password, confirmpassword, phone } = req.body;

      if(!name) {
        return res.status(422).json({message: "Nome obrigatório!"});
      }
      if(!email) {
        return res.status(422).json({message: "email obrigatório!"});
      }
      if(!password) {
        return res.status(422).json({message: "Senha obrigatória!"});
      }
      if(!confirmpassword) {
        return res.status(422).json({message: "confirmação de senha obrigatório!"});
      }
      if(!phone) {
        return res.status(422).json({message: "Número de telefone obrigatório!"});
      }

      if(password !== confirmpassword) {
        return res.status(422).json({message: "A senha e a confirmação de senha precisam ser iguais!!"});
      }

      //check if user exists
      const userExists = await User.findOne({email: email});

      if(userExists) {
        return res.status(422).json({message: "Usuário com este email já existe!"});
      }

    } catch (error) {
      console.log(error);
    }
  }
}