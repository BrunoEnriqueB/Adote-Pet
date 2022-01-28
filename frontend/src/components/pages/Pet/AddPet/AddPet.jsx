import './AddPet.css';
import { api } from '../../../../utils/api';


// hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseFlashMessage } from '../../../../hooks/useFlashMessage';

// componentes
import PetForm from '../../../layout/PetForm/PetForm';

export default function AddPet() {

  
  return (
    <section>
      <div className='addpet_header'>
        <h1>Cadastre um pet</h1>
        <p>Depois ele ficará disponivel para adoção</p>
      </div>
      <PetForm btnText="Cadastrar Pet"/>
    </section>
  )
}