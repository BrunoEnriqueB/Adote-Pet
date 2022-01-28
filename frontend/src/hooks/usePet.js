import { api } from '../utils/api';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseFlashMessage } from './useFlashMessage';
import { getMyPets } from '../services/getPets';

export function usePet() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { setFlashMessage } = UseFlashMessage();
  const [ allPets, setAllPets ] = useState([]);
  const [ teste, setTeste ] = useState('')

  async function registerPet(pet) {
    let msgType = 'sucess';
    

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

    const data = await api.post('/pet/create', formData, {
      Authorization: `Bearer ${JSON.parse(token)}`,
      'Content-Type': 'multipart/form-data'
    }).then((response) => {
      return response.data;
    }).catch((err) => {
      msgType = 'error';
      return err.response.data;
    }) 

    if(msgType !== 'error') {
      navigate('/user/mypets');
    }
    setFlashMessage(data.message, msgType);
    
  }

  async function loadPets() {
    try { 
      const pets = await getMyPets(token);
      if(pets) {
        console.log("if:", pets)
        setTeste('pets')
        setAllPets(...allPets, pets);
        
      }
      console.log("setAllPets:", allPets)
    } catch (error) {
      console.log(error);
    }
    
  }
  
  return { registerPet, loadPets, allPets };
}
