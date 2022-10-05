import Nav from '../components/Nav'
import { FaAddressBook, FaAdn, FaCalendarCheck, FaEraser } from 'react-icons/fa'
import Events from '../components/Events'
import { useEffect, useState } from 'react'
import { useEvents } from '../hooks/use-events'

interface EventsProps {
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

export default function Home() {

  const { events } = useEvents()
  const [data, setData] = useState<EventsProps[]>([])
  const [confirmedEvents, setConfirmedEvents] = useState<EventsProps[]>([])
  const [awaitingEvents, setAwaitingEvents] = useState<EventsProps[]>([])
  const [passedEvents, setPassedEvents] = useState<EventsProps[]>([])
  const [canceledEvents, setCanceledEvents] = useState<EventsProps[]>([])

  useEffect(() => {
    setData(events)
    setConfirmedEvents(events.filter((event: EventsProps) => event.status === "confirmed"))
    setAwaitingEvents(events.filter((event: EventsProps) => event.status === "awaiting"))
    setPassedEvents(events.filter((event: EventsProps) => event.status === "passed"))
    setCanceledEvents(events.filter((event: EventsProps) => event.status === "canceled"))
  }, [events])

  function filterEvents(status: string) {
    if (status === 'all') {
      setData(events)
    } else {
      const filteredEvents = events.filter((event: EventsProps) =>
        new Date(event.date) > new Date() && event.status === status
      )
      setData(filteredEvents)
    }

    if (status === 'passed') {
      const filteredEvents = events.filter((event: EventsProps) =>
        new Date(event.date) < new Date()
      )
      setData(filteredEvents)
    }
  }

  return (
    <div className="container">
      <Nav />
      <div className="home-content">
        <div className="alerts">

          <div className="profile-box">
            <div className="top-profile">
              <img src="./images/profile.jpg" alt="Avatar" />

              <div className="profile-data">
                <span>Jonata Santos</span>
                <span>idade - 31 anos</span>
              </div>
            </div>

            <p>
              <strong>Sobre mim: </strong>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nesciunt error aliquid repellendus, sed neque minima eligendi
              nemo cum architecto dignissimos, ut ipsam eos deleniti itaque
              illo enim voluptatibus id explicabo.
            </p>
          </div>

          <div className="alert-box passed-box">
            <span><strong>Eventos realizados: </strong> {passedEvents.length} </span>
            <FaAdn className="icon passed" />
          </div>

          <div className="alert-box awaiting-box">
            <span><strong>Eventos agendados: </strong> {awaitingEvents.length} </span>
            <FaAddressBook className="icon awaiting" />
          </div>

          <div className="alert-box confirmed-box">
            <span><strong>Eventos confirmados: </strong> {confirmedEvents.length} </span>
            <FaCalendarCheck className="icon confirmed" />
          </div>

          <div className="alert-box canceled-box">
            <span><strong>Eventos cancelados: </strong> {canceledEvents.length}</span>
            <FaEraser className="icon canceled" />
          </div>

        </div>

        <div className="events">

          <div className="search-bar">
            <label htmlFor="parse">Exibir: </label>
            <select id="parse" onChange={e => filterEvents(e.target.value)}>
              <option value="all">Todos</option>
              <option value="passed">Realizados</option>
              <option value="confirmed">Agendados</option>
              <option value="awaiting">Aguardando aprovação</option>
              <option value="canceled">Cancelados</option>
            </select>
          </div>

          {data.map((event: any, index: any) => (
            <Events
              key={index}
              index={index}
              id={event.id}
              image={event.image}
              title={event.title}
              status={new Date(event.date) < new Date() && event.status === 'confirmed' ? 'passed' : event.status}
              date={event.date}
              details={event.details}
              location={event.location}
              productors={event.productors}
              price={event.price}
            />
          )) || ""}

        </div>
      </div>
    </div>
  )
}