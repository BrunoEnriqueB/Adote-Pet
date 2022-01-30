import { UseFlashMessage } from "../hooks/useFlashMessage";
import { api } from "../utils/api";

export async function schedule(id) {
  const { setFlashMessage } = UseFlashMessage();
  return api.patch(`/pet/schedule/${id}`).then((res) => {
    setFlashMessage(res.data.message, 'sucess');
    return res.data.message;
  }).catch((err) => {
    setFlashMessage(err.response.data.message, 'error');
    return err.response.data.message;
  })
}