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
      console.log("removeu");
      setSelectedOptions([
        ...selectedOptions.slice(0, index),
        ...selectedOptions.slice(index + 1),
      ]);
    } else {
      console.log("selecionou");

      if (option === "todos") {
        setSelectedOptions([option]);
      } else {
        const updatedOptions = [];

        selectedOptions.forEach((op) => {
          if (op !== "todos") {
            updatedOptions.push(op);
          }
        });
        updatedOptions.push(option);
        setSelectedOptions(updatedOptions);
      }
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

  const handleRemoveOption = (option) => {
    const index = confirmedOptions.indexOf(option);

    if (index !== -1) {
      setConfirmedOptions([
        ...confirmedOptions.slice(0, index),
        ...confirmedOptions.slice(index + 1),
      ]);

      setSelectedOptions([
        ...selectedOptions.slice(0, index),
        ...selectedOptions.slice(index + 1),
      ]);

      const sortedIndex = sortedOptions.findIndex((o) => o.value === option);

      if (sortedIndex !== -1) {
        console.log("teste");
        sortedOptions[sortedIndex].isChecked = false;
      }
    }
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
            <button
              className="fake-select__button"
              onClick={handleConfirmClick}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      {confirmedOptions.length > 0 && !isOpen && (
        <div className="fake-select__selected-options">
          {confirmedOptions.map((option) => (
            <span
              key={option}
              className="fake-select__selected-option"
              onClick={() => handleRemoveOption(option)}
            >
              {option}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxSelect;
