import { api } from "../utils/api";

import { UseFlashMessage } from "../hooks/useFlashMessage";

export async function concludeAdoption(id) {
  const { setFlashMessage } = UseFlashMessage();
  await api.patch(`/pet/conclude/${id}`).then((res) => {
    setFlashMessage(res.data.message, 'sucess');
    return res.data;
  }).catch((err) => {
    setFlashMessage(err.response.data.message, 'error');
    return err.response.data;
  })
}