import './EditPet.css';
import '../../../layout/Input/Form.css';

//hooks
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

//components
import PetForm from '../../../layout/PetForm/PetForm';

//context
import { usePets } from '../../../../hooks/usePet';

export default function EditPet() {
  const { getPetById, editMyPet } = usePets();
  const { id } = useParams();
  const [ pet, setPet ] = useState([])
  
  useEffect(() => {
    handleGetPet()  
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleGetPet() {
    const data = await getPetById(id);
    setPet(data);
  }


  async function handleEditPet(pet) {
    editMyPet(pet);
  }

  return (
    <section>
      <div className='addpet_header'>
        <h1>Editando o Pet: {pet.name}</h1>

      </div>
      {pet.name && (
        <PetForm btnText="Editar Pet" handleSubmit={handleEditPet} petData={pet}/>
      )}
      
    </section>
  )
}