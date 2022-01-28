import './MyPets.css';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyPets() {
  const [ myPets, setMyPets ] = useState([]); 

  useEffect(() => {
   
  })

  
  return (
    <section>
      <div className="informations">
        <h1>Pets</h1>
        <Link to="/pet/addpet">Cadastrar Pet</Link>
      </div>
      <div>
        {myPets.length > 0 && <p>Meus pets cadastrados</p>}
        {myPets.length === 0 && <p>Não há pets cadastrado</p>}
      </div>
    </section>
  )
}