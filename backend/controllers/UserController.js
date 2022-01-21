const User = require('../models/User');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/createUserToken');

module.exports = class UserController {
  static createUser = async (req, res) => {
    const { name, email, password, confirmpassword, phone } = req.body;

    if (!name) {
      return res.status(422).json({ message: "Nome obrigatório!" });
    }
    if (!email) {
      return res.status(422).json({ message: "email obrigatório!" });
    }
    if (!password) {
      return res.status(422).json({ message: "Senha obrigatória!" });
    }
    if (!confirmpassword) {
      return res.status(422).json({ message: "confirmação de senha obrigatório!" });
    }
    if (!phone) {
      return res.status(422).json({ message: "Número de telefone obrigatório!" });
    }

    if (password !== confirmpassword) {
      return res.status(422).json({ message: "A senha e a confirmação de senha precisam ser iguais!!" });
    }

    //check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ message: "Usuário com este email já existe!" });
    }

    //create cryptografe password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // creat a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash
    });

    try {
      
      const newUser = await user.save();
      // da pra criar usuário assim também
      //await User.create({ name, email, phone, password: passwordHash })

      await createUserToken(newUser, req, res); //criando nosso JWT
    } catch (error) {
      res.status(500).json({message: error})
    }
  }
}