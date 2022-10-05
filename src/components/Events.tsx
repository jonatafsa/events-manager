import { FaLongArrowAltDown, FaTrash } from 'react-icons/fa'
import { useEvents } from '../hooks/use-events'
import { PriceMask } from '../utils/Maks'
import { toast } from './Toast'

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
  index: number
}

export default function Events(props: EventsProps) {

  const { eventChange } = useEvents()

  function toggleEventDetails(id: string) {
    const eventItem = document.querySelector('#event-' + id)
    const iconEventItem = document.querySelector('#icon-event-' + id)
    eventItem?.classList.toggle('event-open')
    iconEventItem?.classList.toggle('event-icon-rotate')
  }

  function toggleDeleteEvent(id: string, index: number) {
    const eventItems = document.querySelectorAll('.event-item')

    fetch(`http://localhost:3333/event/${id}`, {
      method: 'DELETE',
    }).then(response => response.json())
      .then(data => {
        eventChange()
        eventItems.forEach((item) => {
          item.classList.remove('event-open')
        })
        toast.show({ message: "Evento apagado!", type: "success" })
      })
  }

  function toggleCancelEvent(id: string, status: string, index: number) {
    fetch(`http://localhost:3333/event/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status
      }),
    }).then(response => response.json())
      .then(data => {
        eventChange()
        toast.show({
          message: status === "canceled" ? "Evento cancelado!" : "Evento Confirmado!",
          type: status === "canceled" ? "error" : "success",
        })
      })
  }

  return (
    <div
      className={`event-item ${props.status}-box`}
      id={`event-${props.id}`}
    >
      <img src={props.image} alt="" />

      <div className="details-event">
        <div className="fill-event">
          <h4>{props.title}</h4>
          <p>
            Status: <br />
            {props.status === 'awaiting' && <strong className="awaiting">Aguardando aprovação</strong>}
            {props.status === 'canceled' && <strong className="canceled">Evento cancelado</strong>}
            {props.status === 'confirmed' && <strong className="confirmed">Evento confirmado</strong>}
            {props.status === 'passed' && <strong className="passed">Evento concluído</strong>}
          </p>
          <p>
            Data do evento: <br />
            {new Date(props.date).toLocaleDateString('pt-br', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
          <FaLongArrowAltDown
            className={`icon ${props.status}`}
            onClick={() => toggleEventDetails(props.id)}
            id={`icon-event-${props.id}`}
          />
        </div>

        <div className="full-event">
          <p>
            <strong>Detalhes: </strong>
            {props.details}
          </p>

          <p>
            <strong>Local do evento: </strong>
            {props.location}
          </p>

          <p>
            <strong>Produtores: </strong>
            {props.productors}
          </p>

          <span>
            <strong>Valor do evento: </strong>
            R$ {PriceMask(props.price)}
          </span>
        </div>

        <div className="buttons">
          <FaTrash className="delete" onClick={() => toggleDeleteEvent(props.id, props.index)} />
          {props.status === 'awaiting' && (
            <>
              <button
                className="cancel"
                onClick={() => toggleCancelEvent(props.id, 'canceled', props.index)}
              >Cancelar Evento</button>
              <button
                className="passed"
                onClick={() => toggleCancelEvent(props.id, 'confirmed', props.index)}
              >Aprovar Evento</button>
            </>
          )}
        </div>
      </div>

    </div>
  )
}
