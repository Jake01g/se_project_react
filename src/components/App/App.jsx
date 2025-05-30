import { useEffect, useState } from "react";
import "./App.css";
//import { Route, Routes } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import api from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [items, setItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    validateForm();
  }, [formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new item object from form values
    const newItem = {
      name: formValues.name,
      imageUrl: formValues.imageUrl,
      weather: formValues.weather,
    };

    // Add new item to items array
    setItems([...items, newItem]);

    // Close modal
    closeActiveModal();

    // Reset form values
    setFormValues({
      name: "",
      imageUrl: "",
      weather: "",
    });
  };

  const handleFormChange = (name, imageUrl, weather) => {
    setFormValues({
      ...formValues, // keep existing values
      name: name || formValues.name, // update if provided
      imageUrl: imageUrl || formValues.imageUrl,
      weather: weather || formValues.weather,
    });
  };
  const isUrlValid = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const validateForm = () => {
    const isNameValid = formValues.name.length >= 2;
    const isWeatherValid =
      formValues.weather === "hot" ||
      formValues.weather === "warm" ||
      formValues.weather === "cold";
    const formValid =
      isNameValid && isUrlValid(formValues.imageUrl) && isWeatherValid;
    setIsFormValid(formValid);
    return formValid;
  };

  const handleNameChange = (e) => {
    handleFormChange(e.target.value, null, null);
  };

  const handleImageChange = (e) => {
    handleFormChange(null, e.target.value, null);
  };

  const handleWeatherChange = (e) => {
    handleFormChange(null, null, e.target.value);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItemSubmit = (item) => {
    api
      .addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .removeItem(card.id)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            //items={clothingItems}
          />
          <Footer />
        </div>
        <ModalWithForm
          title="New Garment"
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          isFormValid={isFormValid}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
              value={formValues.name}
              onChange={handleNameChange}
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
              value={formValues.imageUrl}
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
                checked={formValues.weather === "hot"}
                onChange={handleWeatherChange}
              />{" "}
              <label
                htmlFor="hot"
                className="modal__label modal__label-type-radio"
              >
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
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
