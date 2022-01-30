import './MyAdoptions.css';
import '../css/Dashboard.css';

import {  useEffect } from 'react';
import { usePets } from '../../../../hooks/usePet';

//components 
import Image from '../../../layout/Image/Image';

export default function MyAdoptions() {
  const { getMyAdoptedPets, myAdoptedPets } = usePets();

  async function handleGetPets() {
    await getMyAdoptedPets();
  }

  useEffect(() => {
    handleGetPets();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>Minhas adoções</h1>
      {myAdoptedPets.length > 0
      ? (
        myAdoptedPets.map((pet) => (
          <div key={pet._id} className='petlist_row'>
             <Image
              src={`${process.env.REACT_APP_API}/images/pets/${pet.image[0]}`}
              all={pet.name}
              width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className='contacts'>
                <p>
                  <span className="bold">Ligue para:</span> {pet.user.phone}
                </p>
                <p>
                  <span className="bold">Fale com:</span> {pet.user.name}
                </p>
              </div>
              <div className="actions">
                {pet.available
                ?(
                  <>
                  <p>Adoção em processo</p>
                  </>
                )
                : (
                  <p>Adoção concluída</p>
                )}
              </div>
          </div>
        ))
      )
      : (
        <p>Ainda não há adoções de pets</p>
      )}
    </>
    
  )
}