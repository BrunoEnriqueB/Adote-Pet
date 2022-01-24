import Input from "../../layout/Input/Input";

export default function Register() {
  function handleChange(e) {}

  return (
    <section>
      <h1>Registrar</h1>
      <form action="" method="POST">
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
        />
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Digite seu email"
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
        />
        <input type="submit" value="Cadastrar" />
      </form>
    </section>
  );
}
