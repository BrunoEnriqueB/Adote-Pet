const multer = require('multer');
const path = require('path');

//Destino pra salvar as images
const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    let folder = "";
    if(req.baseUrl.includes('user')) { //verifica de qual categoria é a imagem
      folder = 'users';
    } else if (req.baseUrl.includes('pet')) {
      folder = 'pets';
    }

    cb(null, `public/images/${folder}`);
  }, //destino q vai ser salvo
  filename: function (req, file, cb) {
    cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname)); // adiciona a hora que a imagem foi adicionada no nome da imagem
  }, //nome do arquivo
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) { //filtra o arquivo
    if(!file.originalname.match(/\.(png|jpg)$/)) { //verifica se é png ou jpg
      return cb(new Error("Por favor, envie apenas jpg ou png!")); 
  }
    cb(undefined, true);
  }
})

module.exports = { imageUpload }

