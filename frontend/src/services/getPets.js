import { api } from '../utils/api';

export function getMyPets(token) {
  return api.get('/pet/mypets', {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}` 
    }
  }).then((res) => res.data)
}
