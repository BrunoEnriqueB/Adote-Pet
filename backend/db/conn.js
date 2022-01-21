const mongoose = require('mongoose');

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/getapet');
}

main().catch(err => console.log(err));

module.exports = mongoose;