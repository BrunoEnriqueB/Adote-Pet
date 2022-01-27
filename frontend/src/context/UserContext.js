import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

const Context = createContext();
function UserProvider({children}) { //entidade que da o contexto pras outras entidades
  const { register, authenticated, logoutUser, login } = useAuth();



  return (
    <Context.Provider value={{ authenticated, register, logoutUser, login }}>
      {children}
    </Context.Provider>
  )
}

export { Context, UserProvider }