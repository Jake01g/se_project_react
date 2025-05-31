import { useEffect, useState } from "react";
import "./App.css";
//import { Route, Routes } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import api from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  //const [isFormValid, setIsFormValid] = useState(true);
  /*   const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  }); */
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  /*
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
    setItems([...clothingItems, newItem]);

    // Close modal
    closeActiveModal();

    // Reset form values
    setFormValues({
      name: "",
      imageUrl: "",
      weather: "",
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
*/
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

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    setClothingItems((prevItems) => [
      { name, link: imageUrl, weather },
      ...prevItems,
    ]);
    closeActiveModal();
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
            clothingItems={clothingItems}
          />
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          // isFormValid={isFormValid}
          onAddItemSubmit={handleAddItemSubmit}
        />
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
