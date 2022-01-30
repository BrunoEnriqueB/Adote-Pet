import { api } from "../utils/api";

export async function getAllPets() {
  return api.get('/pet').then((res) => {
    return res.data;
  }).catch((err) => {
    return err.data.message;
  });
}