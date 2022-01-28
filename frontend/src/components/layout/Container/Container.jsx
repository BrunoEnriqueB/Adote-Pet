import { Route, Routes } from 'react-router-dom';

// pages
import Login from '../../pages/Auth/Login/Login';
import Register from '../../pages/Auth/Register/Register';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile/Profile';
import PageNotFound from '../../pages/404/404';
import MyPets from '../../pages/Pet/MyPet/MyPets';
import AddPet from '../../pages/Pet/AddPet/AddPet';

//contexto
// import { PetProvider } from '../../../context/PetContext';
import { PetsProvider } from '../../../hooks/usePetR';

//css
import './Container.css';

export default function Container() {
  return (
    <main className="container">
      <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/user/profile" element={<Profile />}/>
          <Route path="/user/mypets" element={<PetsProvider><MyPets/></PetsProvider> } />
          <Route path="/pet/addpet" element={<PetsProvider><AddPet /></PetsProvider> } />
          <Route path="/" element={<Home />}/>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
    </main>
  )
}