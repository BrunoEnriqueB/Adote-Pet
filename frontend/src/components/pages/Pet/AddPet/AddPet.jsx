import './AddPet.css';
import { api } from '../../../../utils/api';


// hooks
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../../context/PetContext';

// componentes
import PetForm from '../../../layout/PetForm/PetForm'

export default function AddPet() {
  const { registerPet } = useContext(Context);
  const navigate = useNavigate();

  async function handleSubmit(pet) {
    registerPet(pet);
  }

  return (
    <section>
      <div className='addpet_header'>
        <h1>Cadastre um pet</h1>
        <p>Depois ele ficará disponivel para adoção</p>
      </div>
      <PetForm btnText="Cadastrar Pet" handleSubmit={handleSubmit}/>
    </section>
  )
}