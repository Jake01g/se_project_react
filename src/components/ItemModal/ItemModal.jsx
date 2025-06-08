import "./ItemModal.css";

function ItemModal({ activeModal, card, onClose, handleCardDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="item__modal-content modal__content-type-image">
        <button onClick={onClose} type="button" className="item__modal-close">
          CLOSE
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={() => handleCardDelete(card)}
            className="modal__delete-button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
