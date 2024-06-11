import React from "react";
import WidgetInput from "../utils/WidgetInput";

const EditableWidget = ({ description, price, onDescriptionChange, onPriceChange }) => {
  const descriptionAttr = { min: 1, max: 1000, text: "Description" };
  const priceAttr = { min: 1, max: 20000, text: "Price" };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= descriptionAttr.max) {
      onDescriptionChange(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (
      (parseFloat(value) <= priceAttr.max &&
        value.match(/^\d{1,}(\.\d{0,2})?$/)) ||
      value === ""
    ) {
      onPriceChange(value);
    }
  };

  return (
    <>
      <WidgetInput
        attributes={priceAttr}
        value={price}
        handleChange={handlePriceChange}
      />
      <WidgetInput
        attributes={descriptionAttr}
        value={description}
        handleChange={handleDescriptionChange}
      />
    </>
  );
};

export default EditableWidget;
