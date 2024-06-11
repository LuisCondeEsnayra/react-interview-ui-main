import React from "react";
import classes from "./index.module.css";

const WidgetInput = ({ attributes, value, handleChange, error }) => {
  return (
    <>
      <p>{attributes.text}</p>
      <input type="text" value={value} onChange={handleChange} />
      {error ? (
        <p className={classes.errorMessage}>
          {attributes.text} must be between {attributes.min} and {""}
          {attributes.max} {attributes.text !== "Price" ? "characters" : ""}
        </p>
      ) : (
        <p/>
      )}
    </>
  );
};

export default WidgetInput;
