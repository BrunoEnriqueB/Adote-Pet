import { UseFlashMessage } from '../hooks/useFlashMessage';
import { api } from '../utils/api';


export async function getMyPetById(id) {
  const { setFlashMessage } = UseFlashMessage();
  return await api.get(`/pet/${id}`).then((res) => {
    return res.data;
  }).catch((err) => {
    setFlashMessage(err.data.message, 'error');
    return err.data.message;
  })
}