import './MyPets.css';
import '../css/Dashboard.css';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Image from '../../../layout/Image/Image';

//contexto
import { usePets } from '../../../../hooks/usePet';

export default function MyPets() {
  const { loadPets, allPets, deletePet, concludeAdoptionById } = usePets();

  async function concludeAdoption(id) {
    await concludeAdoptionById(id);
  }

  async function handleDeletePet(id) {
    await deletePet(id);
  }

  useEffect(() => {
    loadPets();
  }, [allPets.available]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section>
      <div className='petlist_header'>
        <h1>Pets</h1>
        <Link to="/pet/addpet">Cadastrar Pet</Link>
      </div>
      <div className='.petlist_container'>
        {allPets.length > 0 && (
          allPets.map((pet) => (
            <div key={pet._id} className='petlist_row'>
              <Image
              src={`${process.env.REACT_APP_API}/images/pets/${pet.image[0]}`}
              all={pet.name}
              width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className="actions">
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button onClick={() => {
                        concludeAdoption(pet._id);
                      }} className='conclude_btn'>Concluir adoção</button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button onClick={() => {
                      handleDeletePet(pet._id)
                    }}>Excluir</button>
                  </>
                ) : (
                  <span className="bold">
                    <p>Pet já adotado</p>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
        {allPets.length === 0 && <p>Você não tem pets!</p>}
      </div>
    </section>
  )
}