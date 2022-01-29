import { createContext, useContext, useState } from 'react';

import { UseFlashMessage } from './useFlashMessage';

import 
{ useNavigate } from 'react-router-dom';

import 
{ api } from '../utils/api';

//services
import { getMyPets } from '../services/getPets';
import { deleteMyPet } from '../services/deleteMyPet'

export const PetsContext = createContext({});

function PetsProvider({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { setFlashMessage } = UseFlashMessage();
  const [ allPets, setAllPets ] = useState([]);


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
    const pets = await getMyPets(token);
    try {
      setAllPets(pets);
    } catch (error) {
      console.log(error)
    }
    
  }

  async function deletePet(id) {
    try {
      const msgText = await deleteMyPet(id, token);
      console.log("msg", msgText)
      const updatedPets = allPets.filter((pet) => pet._id !== id);
      setAllPets(updatedPets);
    } catch (error) {
      console.log(error);
    }
    
    
  }

  return (
    <PetsContext.Provider value={{
      registerPet, loadPets, allPets, deletePet
    }}>
      {children}
    </PetsContext.Provider>
  )
}

function usePets() {
  const context = useContext(PetsContext);

  return context;
}

export {
  PetsProvider,
  usePets
}