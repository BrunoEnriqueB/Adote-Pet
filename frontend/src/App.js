import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  );
}

