import User from "../models/User.js";
import bcrypt from 'bcrypt';
import createUserToken from '../helpers/createUserToken.js';


export default class UserController {
  static async register(req, res) {
    const {name, email, password, confirmpassword, phone } = req.body;

    if (!name) {
      return res.status(422).json({message: "o nome é obrigatório!"});
    }
    if (!email) {
      return res.status(422).json({message: "o email é obrigatório!"});
    }
    if (!password) {
      return res.status(422).json({message: "a senha é obrigatório!"});
    }
    if (!confirmpassword) {
      return res.status(422).json({message: "a confirmação de senha é obrigatório!"});
    }
    if (!phone) {
      return res.status(422).json({message: "o número é obrigatório!"});
    }
    if (password !== confirmpassword) {
      return res.status(422).json({message: "as senhas são diferentes!"})
    }

    //check if user exists
    const existsUser = await User.findOne({name: name});
    if (existsUser) {
      return res.status(422).json({message: "esse email já está sendo utilizado!"})
    }

    //create hashpassword
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashPassword,
      phone
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res)
    } catch (error) {
      return res.status(422).json({message: error})
    }
  }
}