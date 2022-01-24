import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/Auth/Login';
import Register from '../../pages/Auth/Register';
import Home from '../../pages/Home';
import './Container.css';

export default function Container() {
  return (
    <main className="container">
      <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
    </main>
  )
}