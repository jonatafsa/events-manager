//Hooks Nativos do React
import { createContext, ReactNode, useState, useEffect } from "react"

//Definindo o tipo do usuário de contexto
type Event = {
  id: string
  image: string
  title: string
  status: string
  date: Date
  details: string
  location: string
  productors: string
  price: number
}

//Definindo o tipo do Contexto
type EventContextType = {
  //user recebe a Tipagem 'User do usuário de contexto'
  events: any
  //signInWithGoogle recebe uma função de processamento assíncrona(Promise), sem retorno'<void>'
  eventChange: () => Promise<void>
}

//As propriedades do contexto(children) recebe o tipo ReactNode(JSX.Element), nativo do React
type EventContextProviderProps = {
  children: ReactNode
}

//Exporta o contexto
//o contexto recebe como valor um objeto e esse objeto é do tipo 'ModalContextType'
export const EventContext = createContext({} as EventContextType)

//Exporta o Provider que é responsável por conter toda a lógica do contexto
export function EventContextProvider(props: EventContextProviderProps) {
  //Cria um estado que recebe os dados do usuário
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetch(`http://localhost:3333/events`)
      .then(response => response.json())
      .then(data => {
        setEvents(data)
        console.log(data)
      })
  }, [])


  async function eventChange() {
    fetch(`http://localhost:3333/events`)
      .then(response => response.json())
      .then(data => {
        setEvents(data)
        console.log(data)
      })
  }

  //Retorno do contexto do Provider
  return (
    <EventContext.Provider value={{ events, eventChange }}>
      {props.children}
    </EventContext.Provider>
  )
}