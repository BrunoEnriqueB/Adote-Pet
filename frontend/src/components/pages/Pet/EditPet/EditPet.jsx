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
  const { getPetById } = usePets();
  const { id } = useParams();
  const [ pet, setPet ] = useState([])

  async function handleGetPet() {
    const data = await getPetById(id);
    setPet(data);
  }

  useEffect(() => {
    handleGetPet()  
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit() {
    
  }

  return (
    <section>
      <div className='addpet_header'>
        <h1>Edite o pet</h1>

      </div>
      <PetForm btnText="Editar Pet" handleSubmit={handleSubmit} petData={pet}/>
    </section>
  )
}