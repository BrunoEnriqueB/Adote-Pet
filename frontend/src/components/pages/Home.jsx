import { useEffect } from 'react';
import './Home.css';

import { usePets } from '../../hooks/usePet';
import { Link } from 'react-router-dom';

export default function Home() {
  const { loadAllPets, allPets } = usePets();

  async function handleLoadPets() {
    await loadAllPets();
  }

  useEffect(() => {
    handleLoadPets();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section>
      <div className='pet_home_header'>
        <h1>Adote um pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      <div className='pet_container'>
        {allPets.length > 0 && (
          allPets.map((pet) => (
            <div className='pet_card'>
              <div 
              className='image' 
              style={
                {backgroundImage: 
                  `url(${process.env.REACT_APP_API}/images/pets/${pet.image[0]})`}}
              />
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              {pet.available 
              ? (<p className='btn'><Link to={`/pet/${pet._id}`}>Mais detalhes</Link></p>) 
              : (<p className='adopted_text'>Adotado</p>)

              }
            </div>
          ))
        )}
        {allPets.length === 0 && (
          <p>Não há pets cadastrados </p>
        )}
      </div>
    </section>
  ) 
}