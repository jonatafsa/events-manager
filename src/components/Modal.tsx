export default function Modal(props: any) {

  function modalToggle() {
    const admin = document.querySelector(".container");
    admin?.classList.remove("open");
    document.body.classList.remove("stop-scrolling")
  }

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={modalToggle}></div>
      <div className="slider-wrap">
        <span>{props.title}</span>

        {props.children}
      </div>
    </div>
  );
}
