import { BrowserRouter as Router } from 'react-router-dom';
// Context
import { UserProvider } from './context/UserContext';
// componentes
import Footer from './components/layout/Footer/Footer';
import Navbar from './components/layout/Navbar/Navbar';
import Container from './components/layout/Container/Container.js';
import Message from './components/layout/Message/Message';

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message/>
        <Container />
        <Footer />
      </UserProvider>
    </Router>
  );
}

