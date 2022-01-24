import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// componentes
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container.js';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Container />
      <Footer />
    </Router>
  );
}

