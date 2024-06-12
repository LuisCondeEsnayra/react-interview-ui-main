import React, { useState } from "react"; 
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import WidgetInput from "../utils/WidgetInput";
import { updateWidget } from "../../lib/apiConnect";

const EditableWidget = ({ widget, refreshWidgets, handleCancel }) => {
  
  const { description, name, price } = widget;
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);

  
  const descriptionAttr = { min: 1, max: 1000, text: "Description" };
  const priceAttr = { min: 1, max: 20000, text: "Price" };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= descriptionAttr.max) {
      setNewDescription(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (
      (parseFloat(value) <= priceAttr.max &&
        value.match(/^\d{1,}(\.\d{0,2})?$/)) ||
      value === ""
    ) {
      setNewPrice(value);
    }
  };

  const handleSubmit=()=>{ 
    updateWidget({name,description: newDescription, price:newPrice}).catch((error) =>
        console.error("Error updating widget", error)
    );
    refreshWidgets()
  }

  return (   <Grid item xs={6}>
    <Card>
        <CardContent>
            <Stack spacing={2}>
                <Typography component="div" gutterBottom variant="h4">
                    {name}
                </Typography> 
                <WidgetInput
                  attributes={priceAttr}
                  value={newPrice}
                  handleChange={handlePriceChange}
                />
                <WidgetInput
                  attributes={descriptionAttr}
                  value={newDescription}
                  handleChange={handleDescriptionChange}
                />

            </Stack>

            <Button onClick={handleSubmit} variant="contained">
                Submit
            </Button>
            <Button onClick={handleCancel} variant="contained" color="error">
                Cancel
            </Button>
        </CardContent>
    </Card>
</Grid> 
  );
};

export default EditableWidget;
