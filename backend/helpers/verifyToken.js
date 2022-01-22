const jwt = require('jsonwebtoken');
const getToken = require('./gettoken');

//middleware to validate token
const checkToken = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).json({message: "sem token!"})
  }
  
  const token = getToken(req);
  if(!token) {
    return res.status(401).json({message: "Acesso negado!"})
  }

  try {
    const verified = jwt.verify(token, "nossosecret");
    req.user = verified
    next();
  } catch (error) {
    res.status(400).json({message: "Token inválido!"})
  }
}

module.exports = checkToken;