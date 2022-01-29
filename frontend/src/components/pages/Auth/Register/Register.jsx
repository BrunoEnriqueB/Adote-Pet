import { Link } from 'react-router-dom';
import { useState } from 'react';

// Componentes
import Input from "../../../layout/Input/Input";

// CSS
import '../../../layout/Input/Form.css';
import './Register.css';

//context
import { useAuth } from '../../../../hooks/useAuth';

export default function Register() {
  const [ user, setUser ] = useState({});
  const { register } = useAuth();

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();

    //enviar usuário para o banco
    register(user);

  }

  return (
    <section className="form-container">
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit} >
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
          required={true}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          required={true}
        />
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Digite seu email"
          handleOnChange={handleChange}
          required={true}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
          required={true}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
          required={true}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login"> Clique aqui! </Link>
      </p>
    </section>
  );
}
