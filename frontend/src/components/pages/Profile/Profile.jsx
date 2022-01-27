import { useState, useEffect } from 'react';

//css
import '../../layout/Input/Form.css'
import './Profile.css';

//components 
import Input from '../../layout/Input/Input';

import { api } from '../../../utils/api';

//hooks
import { UseFlashMessage } from '../../../hooks/useFlashMessage';

export default function Profile() {
  const [ user, setUser ] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = UseFlashMessage();

  useEffect(() => {
    api.get('/user/checkuser', {
      headers: {
        authorization: `Bearer ${JSON.parse(token)}` 
      }
    }).then(response => {
      setUser(response.data);
    })
  }, [token])

  function handleFileChange(e) {
    setUser({...user, [e.target.name]: e.target.files[0]});
  }

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    let msgType = "sucess";

    const formData = new FormData();

    await Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    })

    const data = await api.patch(`/user/edit/${user._id}`, formData, {
      headers: {
        authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      return response.data
    }).catch(error => {
      msgType = 'error'
      return error.response.data
    })

    setUser(data);

    setFlashMessage(data.message, msgType)
  }


  return (
    <section>
      <div className='profile_header'>
        <h1>Perfil</h1>
        <p>Preview Image</p>
      </div>   
      <form className='form-container' onSubmit={handleSubmit}>
        <Input
          text={"Imagem"}
          type={"file"}
          name={"image"}
          handleOnChange={handleFileChange}
        />
          <Input
            text={"nome"}
            type={"text"}
            name={"name"}
            placeholder={"Digite seu nome"}
            handleOnChange={handleChange}
            value={user.name || ''}
          />
        <Input
          text={"Email"}
          type={"email"}
          name={"email"}
          placeholder={"Digite seu email"}
          handleOnChange={handleChange}
          value={user.email || ''}
        />
        <Input
          text={"Telefone"}
          type={"text"}
          name={"phone"}
          placeholder={"Digite seu número de telefone"}
          handleOnChange={handleChange}
          value={user.phone || ''}
        />
        <Input
          text={"Senha"}
          type={"password"}
          name={"password"}
          placeholder={"Digite sua senha"}
          handleOnChange={handleChange}
        />
        <Input
          text={"Confirmar senha"}
          type={"password"}
          name={"confirmpassword"}
          placeholder={"Confirme sua senha"}
          handleOnChange={handleChange}
        />
        <input type="submit" value="Enviar"/>
      </form>
    </section>
  )
}