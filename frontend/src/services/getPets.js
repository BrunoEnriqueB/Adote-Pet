import { api } from '../utils/api';

export async function getMyPets(token) {  
  return await api.get('/pet/mypets', {
    headers: {
      authorization: `Bearer ${JSON.parse(token)}`
    }
  }).then((res) => res.data.pets)
}
