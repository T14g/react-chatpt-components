import React, { useState } from "react";
import "./style.css";

const CheckboxSelect = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [confirmedOptions, setConfirmedOptions] = useState([]);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const index = selectedOptions.indexOf(option);

    if (index !== -1) {
      setSelectedOptions([
        ...selectedOptions.slice(0, index),
        ...selectedOptions.slice(index + 1),
      ]);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleConfirmClick = () => {
    setConfirmedOptions(selectedOptions);
    setIsOpen(false);
  };

  const handleCancelClick = () => {
    setSelectedOptions(confirmedOptions);
    setIsOpen(false);
  };

  const filterText = confirmedOptions.length ? `${label}:` : label;

  // Sort the options array based on whether they are selected or not
  const sortedOptions = [...options].sort((a, b) => {
    const aIsSelected = selectedOptions.includes(a.value);
    const bIsSelected = selectedOptions.includes(b.value);

    if (aIsSelected && !bIsSelected) {
      return -1;
    } else if (!aIsSelected && bIsSelected) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div className="fake-select">
      <div className="fake-select__selected" onClick={handleSelectClick}>
        <div className="filter-text">{filterText}</div>
        <i className={`fa fa-chevron-${isOpen ? "up" : "down"}`}></i>
      </div>
      {isOpen && (
        <div className="fake-select__options">
          {sortedOptions.map((option) => (
            <div
              key={option.value}
              className="fake-select__option"
              onClick={() => handleOptionClick(option.value)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                readOnly
              />
              <span>{option.label}</span>
            </div>
          ))}
          <div className="fake-select__buttons">
            <button className="fake-select__button" onClick={handleCancelClick}>
              Cancel
            </button>
            <button className="fake-select__button" onClick={handleConfirmClick}>
              Confirm
            </button>
          </div>
        </div>
      )}
      {confirmedOptions.length > 0 && (
        <div className="fake-select__selected-options">
          {confirmedOptions.map((option) => (
            <span key={option} className="fake-select__selected-option">
              {option}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxSelect;
