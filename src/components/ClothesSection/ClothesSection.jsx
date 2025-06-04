import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ weatherData, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes__section-header">
        <p>Your Items</p>
        <button>+ Add New</button>
      </div>
      <ul className="cards__list">
        {clothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
          .map((filteredItem) => {
            return (
              <ItemCard
                key={filteredItem._id}
                item={filteredItem}
                // onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
