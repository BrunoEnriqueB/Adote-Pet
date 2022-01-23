const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//helpers

const createUserToken = require('../helpers/createUserToken');
const getToken = require('../helpers/gettoken');
const getUserByToken = require('../helpers/getUserByToken');

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
      res.status(500).json({ message: error })
    }
  }

  static loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "o email é obrigatório!" });
    }
    if (!password) {
      return res.status(422).json({ message: "a senha é obrigatória!" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({ message: "Não existe usuário com esse email!" });
    }

    //check if password match
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(422).json({ message: "senha inválida!" });
    }

    return await createUserToken(user, req, res);
  }

  static checkUser = async (req, res) => {
    let currentUser;

    if (req.headers.authorization) { // geralmente o token fica em req.headers.authorization

      const token = getToken(req);
      const decoded = jwt.verify(token, "nossosecret");

      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;
    } else {
      currentUser = null; //não existe
    }
    res.send(currentUser)
  }

  static getUserById = async (req, res) => {

    const id = req.params.id;

    const user = await User.findById(id).select("-password") //tira a senha

    if (!user) {
      return res.status(422).json({ message: "Usuário não encontrado!" });
    }

    res.status(200).json(user);

  }

  static editUser = async (req, res) => {
    const { id } = req.params;

    const token = await getToken(req);
    const user = await getUserByToken(token);

    if (id !== user.id) {
      return res.status(401).json({ message: "Sem autorização!" });
    }
    //check if user exists
    if (!user) {
      return res.status(422).json({ message: "Usuário não encontrado!" });
    }

    const { name, email, phone, password, confirmpassword } = req.body;

    let image = '';
    if (req.file) {
      user.image = req.file.filename;
    }

    if (!name) {
      return res.status(422).json({ message: "Nome obrigatório!" });
    }
    user.name = name;
    if (!email) {
      return res.status(422).json({ message: "email obrigatório!" });
    } else {
      const userExists = await User.findOne({ email: email });
      //check if email doesn't already exists in DB
      if (userExists && id !== userExists.id) {
        return res.status(422).json({ message: "esse email já pertence a outro usuário!" });
      }
    }
    user.email = email;
    if (!phone) {
      return res.status(422).json({ message: "Número de telefone obrigatório!" });
    }
    user.phone = phone;
    if (password !== confirmpassword) {
      return res.status(422).json({ message: "Senhas incompátiveis!" });
    } else if (password === confirmpassword && password != null) {
      //creating password
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(password, salt)
      user.password = hashPassword
    }

    try {

      //returns user updated data
      await User.findOneAndUpdate(
        { _id: user.id }, // passamos qual usuário vamos atualizar
        { $set: user }, // passa quais os dados vamos atualizar
        { new: true } // atualizar o updatedAt
      )

      res.status(200).json({ message: "Usuário atualizado com sucesso!" })
    } catch (error) {
      req.status(500).json({ message: error })
      return
    }
  }
}