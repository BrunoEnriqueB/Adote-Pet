import { Route, Routes } from 'react-router-dom';

// pages
import Login from '../../pages/Auth/Login/Login';
import Register from '../../pages/Auth/Register/Register';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile/Profile';
import PageNotFound from '../../pages/404/404';
import MyPets from '../../pages/Pet/MyPet/MyPets';
import AddPet from '../../pages/Pet/AddPet/AddPet';
import EditPet from '../../pages/Pet/EditPet/EditPet';
import PetPage from '../../pages/Pet/PetPage/PetPage'; 
import MyAdoptions from '../../pages/Pet/MyAdoptions/MyAdoptions';

//css
import './Container.css';

  
export default function Container() {
  return (
    <main className="container">
      <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/user/profile" element={<Profile />}/>
          <Route path="/user/mypets" element={<MyPets/> } />
          <Route path="/pet/addpet" element={<AddPet /> } />
          <Route path="/pet/edit/:id" element={<EditPet /> } />
          <Route path="/pet/myadoptions" element={<MyAdoptions />} />
          <Route path="/pet/:id" element={<PetPage />} />
          <Route path="/" element={<Home />}/>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
    </main>
  )
}