import "./ItemModal.css";

function ItemModal({ activeModal, card, onClose }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content-type-image">
        <button onClick={onClose} type="button" className="item__modal-close">
          CLOSE
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
