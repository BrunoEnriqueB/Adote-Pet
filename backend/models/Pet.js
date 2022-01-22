const { Schema } = require('mongoose');
const mongoose = require('../db/conn');

const Pet = mongoose.model(
  'Pet',
  new Schema({
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    },
    available: {
      type: Boolean,
    },
    user: Object, // Não tem relacionamento, então a gente bota o usuário que cadastrou o doguinho
    adopter: Object // Mesma coisa aqui, mas a gente bota as informações do usuário que adotou
  }, {timestamps: true}) //timestamps cria campos createdAt e updatedAt
)

module.exports = Pet;