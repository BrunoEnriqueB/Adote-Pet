import './MyPets.css';

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

//contexto
import { usePetsR } from '../../../../hooks/usePetR';

export default function MyPets() {
  const { loadPets, allPets, qualquerCoisa } = usePetsR();

  useEffect(() => {
    loadPets();
    console.log(qualquerCoisa)  
  }, [])

  
  return (
    <section>
      <div className="informations">
        <h1>Pets</h1>
        <Link to="/pet/addpet">Cadastrar Pet</Link>
      </div>
      <div>
        {qualquerCoisa.lenght > 0 && <p>Meus pets cadastrados</p>}
        {qualquerCoisa.length === 0 && <p>Não há pets cadastrado</p>}
      </div>
    </section>
  )
}