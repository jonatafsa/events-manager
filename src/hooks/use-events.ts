//Importa o contexto de autenticação
import { EventContext } from "../contexts/events-context";
//Importa a Api de contexto do React
import { useContext } from "react";

//Exporta o a função(useAuth)
export function useEvents() {
  //define o valor de value com o contexto
  const value = useContext(EventContext);

  //Retorna value
  return value;
}
