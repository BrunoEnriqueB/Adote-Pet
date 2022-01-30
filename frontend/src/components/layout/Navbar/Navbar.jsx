import { Link } from "react-router-dom";
import Logo from '../../../assets/img/logo.png';
import './Navbar.css';

//contexto
import { useAuth } from "../../../hooks/useAuth";

export default function Navbar() {
  const { authenticated, logoutUser } = useAuth();

  return (
      <nav className="navbar" >
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="Get A Pet" />
          <h2>Get A Pet</h2>
        </Link>
        
      </div>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li>
              <Link to="/pet/myadoptions">Minhas adoções</Link>
            </li>
            <li>
              <Link to="/user/mypets">Meus pets</Link>
            </li>
            <li>
              <Link to="/" onClick={logoutUser}>Sair</Link>
            </li>
          </>
        ) : (
          <>
          <li>
            <Link to="/login">Entrar</Link>
          </li>
          <li>
            <Link to="/register">Cadastrar</Link>
          </li>
          </>
        )}
        
      </ul>
    </nav>
  )
}