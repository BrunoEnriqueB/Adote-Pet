import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../../layout/Input/Input";
import './Login.css';

//contexto
import { userContext } from "../../../../context/UserContext";

export default function Login() {
  const [ user, setUser ] = useState({});
  const { login } = userContext;

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();

    login(user);
  }

  return (
    <section className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Já tem conta? <Link to="/register"> Clique aqui! </Link>
      </p>
    </section>
  ) 
}