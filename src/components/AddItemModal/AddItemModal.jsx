import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({ onClose, isOpen }) {
  const handleFormChange = (name, imageUrl, weather) => {
    setFormValues({
      ...formValues,
      name: name || formValues.name,
      imageUrl: imageUrl || formValues.imageUrl,
      weather: weather || formValues.weather,
    });
  };

  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleNameChange = (e) => {
    handleFormChange(e.target.value, null, null);
  };

  const handleImageChange = (e) => {
    handleFormChange(null, e.target.value, null);
  };

  const handleWeatherChange = (e) => {
    handleFormChange(null, null, e.target.value);
  };

  const handleSubmit = () => {
    e.preventDefault();
    // update the clothingItems array
    // close the modal
    // empty the inputs
  };

  return (
    <ModalWithForm
      title="New Garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      //isFormValid={isFormValid}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleNameChange}
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={formValues.imageUrl}
          onChange={handleImageChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-option">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            checked={formValues.weather === "hot"}
            onChange={handleWeatherChange}
            required
          />{" "}
          <label htmlFor="hot" className="modal__label modal__label-type-radio">
            Hot
          </label>
        </div>
        <div className="modal__radio-option">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            checked={formValues.weather === "warm"}
            onChange={handleWeatherChange}
          />
          <label
            htmlFor="warm"
            className="modal__label modal__label-type-radio"
          >
            Warm
          </label>
        </div>
        <div className="modal__radio-option">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            checked={formValues.weather === "cold"}
            onChange={handleWeatherChange}
          />
          <label
            htmlFor="cold"
            className="modal__label modal__label-type-radio"
          >
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
