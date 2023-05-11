import React, { useState } from "react";
import './style.css';

const CheckboxSelect = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

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

  const filterText = selectedOptions.length ? `${label}:` : label;

  return (
    <div className="fake-select">
      <div className="fake-select__selected" onClick={handleSelectClick}>
        <div className="filter-text">{filterText}</div>
        <i className={`fa fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </div>
      {isOpen && (
        <div className="fake-select__options">
          {options.map((option) => (
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
        </div>
      )}
      {selectedOptions.length > 0 && (
        <div className="fake-select__selected-options">
          {selectedOptions.map((option) => (
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
