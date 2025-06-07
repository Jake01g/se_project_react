import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  weatherData,
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes__section-header">
        <p className="clothes-section__text">Your Items</p>
        <button className="clothes-section__button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
          .map((filteredItem) => {
            return (
              <ItemCard
                key={filteredItem._id}
                item={filteredItem}
                onCardClick={onCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
