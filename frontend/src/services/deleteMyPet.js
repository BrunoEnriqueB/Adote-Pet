import { api } from "../utils/api";

import { UseFlashMessage } from "../hooks/useFlashMessage";

export async function deleteMyPet(id, token) {
  const { setFlashMessage } = UseFlashMessage();
  return await api.delete(`/pet/${id}`).then((res) => {
    setFlashMessage(res.data.message, 'sucess');
    return res.data;
  }).catch((err) => {
    setFlashMessage(err.response.data.message, 'error');
    return err.response.data;
  })
}