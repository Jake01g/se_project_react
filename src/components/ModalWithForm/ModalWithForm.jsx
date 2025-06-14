import "./ModalWithForm.css";

function ModalWithForm({
  name,
  children,
  buttonText = "Add Garment",
  title,
  isOpen,
  onClose,
  isFormValid,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          {" "}
        </button>
        <form className="modal__form" onSubmit={onSubmit} name={name}>
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
