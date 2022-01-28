import { Route, Routes } from 'react-router-dom';

// pages
import Login from '../../pages/Auth/Login/Login';
import Register from '../../pages/Auth/Register/Register';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile/Profile';
import PageNotFound from '../../pages/404/404';
import MyPets from '../../pages/Pet/MyPets';

//css
import './Container.css';

export default function Container() {
  return (
    <main className="container">
      <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/user/profile" element={<Profile />}/>
          <Route path="/user/mypets" element={<MyPets/>} />
          <Route path="/" element={<Home />}/>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
    </main>
  )
}