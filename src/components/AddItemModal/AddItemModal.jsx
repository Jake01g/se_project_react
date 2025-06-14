import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function AddItemModal({ onClose, isOpen, onAddItemSubmit }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItemSubmit({ name, imageUrl, weather });
  };

  useEffect(() => {
    validateForm();
  }, [name, imageUrl, weather]);

  const isUrlValid = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const validateForm = () => {
    const isNameValid = name.length >= 2;
    const isWeatherValid =
      weather === "hot" || weather === "warm" || weather === "cold";
    const formValid = isNameValid && isUrlValid(imageUrl) && isWeatherValid;
    setIsFormValid(formValid);
  };

  return (
    <ModalWithForm
      title="New Garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
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
          value={imageUrl}
          onChange={handleImageChange}
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
            checked={weather === "hot"}
            onChange={handleWeatherChange}
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
            checked={weather === "warm"}
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
            checked={weather === "cold"}
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
