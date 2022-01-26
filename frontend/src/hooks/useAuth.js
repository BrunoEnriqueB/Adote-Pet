// Arquivo de função de autenticação

//api
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; //esse hook serve pra manipular as urls que o usuário acessa
import { UseFlashMessage } from './useFlashMessage';

export function useAuth() {
  async function register(user) {
    let msgText = 'cadastro realizado com sucesso!';
    let msgType = 'sucess';
    const { setFlashMessage } = UseFlashMessage();

    try {
      const data = await api.post('/user/register', user).then((res) => { //manda os dados pra essa rota da API
        return res.data;
      }); 
    } catch (error) {
      msgText = error.response.data.message;
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  return { register };
}