// Arquivo de função de autenticação

//api
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; //esse hook serve pra manipular as urls que o usuário acessa

export function useAuth() {
  async function register(user) {
    try {
      const data = await api.post('/users/register', user).then((res) => { //manda os dados pra essa rota da API
        return res.data;
      }); 
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return { register };
}