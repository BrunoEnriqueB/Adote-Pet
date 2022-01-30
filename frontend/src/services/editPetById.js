import { api } from "../utils/api";
import { UseFlashMessage } from "../hooks/useFlashMessage";
import { useNavigate } from "react-router-dom";

export async function editPetById(pet) {
  const { setFlashMessage } = UseFlashMessage();

  const formData = new FormData();
  await Object.keys(pet).forEach((key) => {
    if(key === 'image') {
      for(let i = 0; i < Object.keys(pet[key]).length; i++) {
        formData.append(key, pet[key][i]);
      }
    } else {
      formData.append(key, pet[key]);
    }
  })
  await api.patch(`/pet/${pet._id}`, formData, {
    headers: {
      'Content-Type': 'multpart/form-data'
    }
  }).then((res) => {
    setFlashMessage(res.data.message, 'sucess');
    return res.data;
  }).catch((err) => {
    setFlashMessage(err.response.data.message, 'error');
    return err.response.data;
  })
}