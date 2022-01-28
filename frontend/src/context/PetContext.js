import { createContext } from "react";
import { usePet } from "../hooks/usePet";


export const Context = createContext();
export function PetProvider({children}) {
  const { registerPet, loadPets, allPets } = usePet();

  return(
    <Context.Provider value={{ registerPet, loadPets, allPets }}>
      {children}
    </Context.Provider>
  )
}
