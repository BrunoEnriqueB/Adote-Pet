const res = require("express/lib/response");


module.exports = getToken = (req) => {
  const authHeader = req.headers.authorization; //pega o Bearer {{token}}
  const token = authHeader.split(" ")[1]; //pega só o token


  return token;
}
