import { api } from '../utils/api';

export async function getMyPets(token) {  
  return await api.get('/pet/mypets').then((res) => res.data.pets)
}
