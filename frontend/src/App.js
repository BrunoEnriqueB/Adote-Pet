import { BrowserRouter as Router } from 'react-router-dom';

// componentes
import Footer from './components/layout/Footer/Footer';
import Navbar from './components/layout/Navbar/Navbar';
import Container from './components/layout/Container/Container.js';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Container />
      <Footer />
    </Router>
  );
}

