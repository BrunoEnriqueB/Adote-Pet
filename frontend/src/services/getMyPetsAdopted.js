import { api } from '../utils/api';
import { UseFlashMessage } from '../hooks/useFlashMessage';

export async function getMyPetsAdopted() {
  const { setFlashMessage } = UseFlashMessage();
  return await api.get('/pet/adoptedpets').then((res) => {
    return res.data.pets;
  }).catch((err) => {
    setFlashMessage(err.response.data.message, 'error');
    return err.response.data;
  })
}