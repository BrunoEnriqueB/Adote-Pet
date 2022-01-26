import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

const Context = createContext();

function UserProvider({children}) { //entidade que da o contexto pras outras entidades
  const { register } = useAuth();

  return (
    <Context.Provider value={{ register }}>
      {children}
    </Context.Provider>
  )
}

export { Context, UserProvider }