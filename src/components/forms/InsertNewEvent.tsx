import { FormEvent, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useEvents } from '../../hooks/use-events';
import '../../styles/components/forms.scss'
import { PriceMask } from '../../utils/Maks';
import { toast } from '../Toast';

export default function InsertNewEvent() {
  const { eventChange } = useEvents()

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [date, setDate] = useState<any>(0)
  const [location, setLocation] = useState("")
  const [details, setDetails] = useState("")
  const [productor, setProductor] = useState("")
  const [arrProductors, setArrProductors] = useState<any>([])
  const [status, setStatus] = useState("awaiting")
  const [price, setPrice] = useState("0")

  function arrProductorsInsert() {
    const arr = arrProductors
    arr.push(productor)
    setArrProductors(arr)
    console.log(arrProductors)
    setProductor("")
  }

  function modalToggle() {
    const admin = document.querySelector(".container");
    admin?.classList.toggle("open");
    document.body.classList.toggle("stop-scrolling")
  }

  function toggleRegisterNewEWvent(e: FormEvent) {
    e.preventDefault()

    if (title === "" || date === 0 || image === "") {
      toast.show({ message: "É necessário título, data e imagem!", type: "info" })
      return
    }

    if (date < new Date().getTime()) {
      toast.show({ message: "A data não pode ser menor que a atual!", type: "info" })
      return
    }

    const data = new FormData()

    data.append("title", title)
    data.append("date", date)
    data.append("location", location)
    data.append("details", details)
    data.append("productors", arrProductors)
    data.append("status", status)
    data.append("price", price)
    data.append("image", image)

    console.log(data)
    fetch("http://localhost:3333/event-create", {
      method: "POST",
      body: data
    }).then(response => response.json())
      .then(() => {
        toast.show({ message: "Evento inserido com sucesso!", type: "success" })
        modalToggle()
        eventChange()
      }).catch(err => {
        toast.show({ message: err.message, type: "error" })
      })

  }

  const imagePreview = (e: any, id: any) => {
    const image = document.querySelector("#" + id)
    console.log(id)

    if (e.target.files[0]) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(e.target.files[0])
      fileReader.addEventListener("load", function () {
        image!.innerHTML = '<img src="' + this.result + '" />';
      })
    }

    setImage(e.target.files[0])
  }

  return (
    <form
      className="insertNewForm"
      onSubmit={toggleRegisterNewEWvent}
      method="post"
      encType="multipart/form-data"
    >

      <label className="select-image" htmlFor="select-image">
        <div className="preview-image" id="image-preview"></div>
        <p>Imagem de capa</p>

        <input
          type="file"
          id="select-image"
          onChange={(e: any) => imagePreview(e, "image-preview")}
        />
      </label>

      <label htmlFor="">Título do evento</label>
      <input
        type="text"
        placeholder="Ex: Show da Anita"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div className="form-two-labels">
        <div>
          <label>Será realizado em</label>
          <input
            type="date"
            // value={date}
            onChange={e => setDate(e.target.valueAsNumber)}
          />
        </div>

        <div>
          <label>No local</label>
          <input
            type="text"
            placeholder="Ex: Auditório Céu Azul"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
      </div>

      <label>Detalhes do evento</label>
      <textarea
        placeholder="Dê detalhes do seu evento"
        value={details}
        onChange={e => setDetails(e.target.value)}
      />

      <div className="form-two-labels">
        <div>
          <label>Inserir Produtor</label>
          <div className="productor-insert">
            <input
              type="text"
              placeholder="Digite e pressione o +"
              value={productor}
              onChange={e => setProductor(e.target.value)}
            />
            <FaPlus className="input-icon" onClick={arrProductorsInsert} />
          </div>
        </div>

        <div className="productors">
          {arrProductors.map((productor: any, index: number) => (
            (index + 1) === arrProductors.length ? <>{productor}</> : <>{productor} / </>
          ))}
        </div>
      </div>

      <div className="form-two-labels">
        <div>
          <label>Status do evento</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="awaiting" selected>Aguardando confirmação</option>
            <option value="confirmed">Confirmado</option>
          </select>
        </div>

        <div>
          <label>Valor do evento</label>
          <input
            type="text"
            placeholder="Digite somente numero"
            value={PriceMask(price)}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="buttons">
        <button type="button" className="cancel" onClick={modalToggle}>Cancelar</button>
        <button className="confirm">Confirmar</button>
      </div>
    </form>
  )
}