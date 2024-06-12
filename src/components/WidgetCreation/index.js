import React, { useState } from "react";  
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import WidgetInput from "../utils/WidgetInput/index.js";
import { updateWidget } from "../../lib/apiConnect.js";

const WidgetCreation = ({onUpdateWidgets}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  // i wouldve like to create a useEfect hook to await for the set state
   const checkErrors= (property,attributes,setProperty)=>{ 
      if (property.length >= attributes.min && property.length <= attributes.max) {
        setProperty(false);
      } else {
        setProperty(true);
      }
       
   }
  const handleSubmit = (e) => {
    e.preventDefault();
    checkErrors(name,nameAttr,setNameError)
    checkErrors(description,descriptionAttr,setDescriptionError)
    checkErrors(price,priceAttr,setPriceError)


    if(!nameError && !descriptionError && !priceError){
        updateWidget({name,description, price}).catch((error) =>
          console.error("Error creating widget", error)
        );
        onUpdateWidgets()
        setName("")
        setDescription("")
        setPrice("")  
    } 
  };

  const handleNameChange = (e) => {
    if (e.target.value.length < nameAttr.max) {
      setName(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length < descriptionAttr.max) {
      setDescription(e.target.value);
    }
  };

  const handlePriceChange = (e) => {
    const amount = e.target.value;
    if (
      (parseFloat(amount) <= priceAttr.max &&
        amount.match(/^\d{1,}(\.\d{0,2})?$/)) ||
      amount === ""
    ) {
      setPrice(amount);
    }
  };

  const nameAttr = { min: 3, max: 100, text: "Name" };
  const descriptionAttr = { min: 1, max: 1000, text: "Description" };
  const priceAttr = { min: 1, max: 20000, text: "Price" };

  return (
      <Card>
        <CardContent>
        <WidgetInput
          attributes={nameAttr}
          value={name}
          handleChange={handleNameChange}
          error={nameError}
        />
        <WidgetInput
          attributes={priceAttr}
          value={price}
          handleChange={handlePriceChange}
          error={priceError}
        />
        <WidgetInput
          attributes={descriptionAttr}
          value={description}
          handleChange={handleDescriptionChange}
          error={descriptionError}
        />

        <Button onClick={handleSubmit}  variant="contained">Create</Button>
        </CardContent> 
      </Card>
  );
};

export default WidgetCreation;
