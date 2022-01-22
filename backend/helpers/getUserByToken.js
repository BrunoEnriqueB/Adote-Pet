const jwt = require('jsonwebtoken');
const User = require('../models/User')


//get User by jwt Token
const getUserByToken = async (token) => {
  if(!token) {
    return res.status(401).json({message: "Acesso negado!"})
  }
  
  const decoded = jwt.verify(token, "nossosecret");

  const userId = decoded.id;

  const user = await User.findById(userId);

  return user;
}

module.exports = getUserByToken;