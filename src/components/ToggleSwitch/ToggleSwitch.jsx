import { useState, useContext, useEffect } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  /*  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");
  useEffect(
    () => setIsChecked(currentTemperatureUnit === "C"),
    [currentTemperatureUnit]
  );
*/
  return (
    <div className="toggle-switch">
      <label className="toggle-switch__label">
        <input
          className="toggle-switch__checkbox toggle-switch__checkbox_state_hidden"
          type="checkbox"
          name="toggle-switch-checkbox"
          /*value={currentTemperatureUnit}
          onChange={handleToggleSwitchChange}
          checked={isChecked} */
        />
        <span className="toggle-switch__circle" />
        <span className="toggle-switch__text toggle-switch__text_F">F</span>
        <span className="toggle-switch__text toggle-switch__text_C">C</span>
      </label>
    </div>
  );
};
export default ToggleSwitch;
