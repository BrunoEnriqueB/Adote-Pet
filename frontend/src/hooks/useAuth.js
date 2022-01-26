// Arquivo de função de autenticação

//api
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //esse hook serve pra manipular as urls que o usuário acessa
import { UseFlashMessage } from './useFlashMessage';

export function useAuth() {
  const { setFlashMessage } = UseFlashMessage();
  const [ authenticated, setAuthenticated ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("aqui segundo")
    const token = localStorage.getItem('token');

    if(token) {
      api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, [])

  async function register(user) {
    console.log("aqui primeiro!")
    let msgText = 'cadastro realizado com sucesso!';
    let msgType = 'sucess';

    try {
      const data = await api.post('/user/register', user).then((response) => { //manda os dados pra essa rota da API
        return response.data;
      }); 

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = 'error';
    }
    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
      setAuthenticated(true);

      localStorage.setItem('token', JSON.stringify(data.token));

      navigate('/');
  }

  return { authenticated ,register };
}