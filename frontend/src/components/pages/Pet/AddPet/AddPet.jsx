import './AddPet.css';

// hooks
import { usePets } from '../../../../hooks/usePet';

// componentes
import PetForm from '../../../layout/PetForm/PetForm'

export default function AddPet() {
  const { registerPet } = usePets();

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