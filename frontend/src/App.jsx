import { BrowserRouter as Router } from 'react-router-dom';
// Context
import { UserProvider } from './hooks/useAuth';
import { PetsProvider } from './hooks/usePet';
// componentes
import Footer from './components/layout/Footer/Footer';
import Navbar from './components/layout/Navbar/Navbar';
import Container from './components/layout/Container/Container.jsx';
import Message from './components/layout/Message/Message';

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message/>
        <PetsProvider>
          <Container />
        </PetsProvider>
        <Footer />
      </UserProvider>
    </Router>
  );
}

