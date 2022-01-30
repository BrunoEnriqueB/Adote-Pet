import './PetPage.css';

//hooks
import { useEffect, useState } from 'react';
import { usePets } from '../../../../hooks/usePet';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';

export default function PetPage() {
  const { getPetById, schedulePet } = usePets();
  const [ pet, setPet ] = useState({});
  const { id } = useParams();
  const { authenticated } = useAuth();

  async function schedule() {
    await schedulePet(id);
  }

  async function handleGetPet() {
   setPet(await getPetById(id));
  }

  useEffect(() => {
    handleGetPet()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {pet.name && (
        <section className='pet_details_container'>
          <div className='pet_details_header'>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
          </div>
          <div className='pet_images'>
            {pet.image.map((image, index) => (
              <img 
              src={`${process.env.REACT_APP_API}/images/pets/${image}`} 
              alt={pet.name} 
              key={`${image} + ${index}`}
              />
            ))}
          </div>
          <p><span className="bold">Peso: </span> {pet.weight}kg</p>
          <p><span className="bold">Idade:</span>{pet.age === 1 ? (`${pet.age} ano`) : (`${pet.age} anos`)}</p>
          {authenticated 
          ? (
            <button onClick={schedule}>Solicitar uma visita</button>
          )
          : (<p>Você precisa <Link to="/register">criar uma conta</Link> para solicitar a visita</p>)}
        </section>
      )}
    </>
  )
}