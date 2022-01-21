import mongoose from "mongoose";

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/getapet2');
}

main().catch(err => console.log(err));

export { main };