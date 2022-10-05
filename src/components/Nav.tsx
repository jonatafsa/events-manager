import { Link } from "react-router-dom";

import Modal from "./Modal";
import { useModal } from "../hooks/use-modal";
import { BiArrowFromLeft } from "react-icons/bi";
import { FaDollarSign, FaUserPlus, FaUsersCog, FaUserShield } from "react-icons/fa";
import { SiCkeditor4 } from "react-icons/si";
import { BsPatchPlusFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { HiDocumentReport } from "react-icons/hi";

import '../styles/components/nav-style.scss'
import InsertNewEvent from "./forms/InsertNewEvent";

export default function Navigation() {
  const { modalChange, modal } = useModal();

  function modalToggle(id: string) {
    if (id === "new-event") {
      modalChange("", <InsertNewEvent />);
    }

    if (id === "insert-another") {
      modalChange("", <h1>MODAL 2</h1>);
    }
  }

  function toogleNavigation() {
    const menu = document.querySelector("nav");
    menu?.classList.toggle("hide");
  }

  return (
    <nav className="hide">
      <Modal title={modal?.title}> {modal?.content}</Modal>
      <BiArrowFromLeft className="toggle-icon" onClick={toogleNavigation} />

      <ul>
        <li>
          <div className="icon">
            <AiFillHome />
          </div>
          <div className="text">Home</div>
        </li>


        <li onClick={() => modalToggle("new-event")}>

          <div className="icon">
            <BsPatchPlusFill />
          </div>
          <div className="text">
            Cadastrar evento
          </div>

        </li>

        <li className="report-style">
          <div className="icon">
            <HiDocumentReport />
          </div>
          <div className="text">Relatórios</div>
          <div className="reports">
            <a href="#nogo"><a>Semanal</a></a>
            <a href="#nogo"><a>Mensal</a></a>
            <a href="#nogo"><a>Anual</a></a>
          </div>
        </li>


        <li onClick={() => modalToggle("insert-another")}>
          <div className="icon">
            <FaUserShield />
          </div>
          <div className="text">
            Outros links
          </div>
        </li>
      </ul>
    </nav>
  );
}
