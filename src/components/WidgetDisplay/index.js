import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditableWidget from "../EditableWidget";
import { deleteWidget, updateWidget } from "../../lib/apiConnect";

const DisplayWidget = ({ widget, onUpdateWidgets}) => {
  const { description, name, price } = widget;
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  const onDescriptionChange= (value)=>{
    
    setNewDescription(value);
  }
  const onPriceChange= (value)=>{
    setNewPrice(value)
  } 
  

  const handleEditSubmit=()=>{
    
    updateWidget({name,description:newDescription, price:newPrice}).catch((error) =>
      console.error("Error updating widget", error)
    );
    setEdit(false);
    onUpdateWidgets()
  }
  const handleCancel = () => {
    setEdit(false);
  };
  const handleDelete = () => { 
    deleteWidget(name).catch((error) =>
      console.error("Error deleting widget", error)
    );
    onUpdateWidgets()
  };
  const displayFields = (
    <>
      <Typography component="div" gutterBottom variant="h5">
        ${price}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {description}
      </Typography>
    </>
  );

  const displayButtons = (
    <>
      <Button onClick={handleEdit} variant="contained">
        Edit
      </Button>
      <Button onClick={handleDelete} variant="contained" color="error">
        Delete
      </Button>
    </>
  );

  const editButtons = (
    <>
      <Button onClick={handleEditSubmit} variant="contained">
        Submit
      </Button>{" "}
      <Button onClick={handleCancel} variant="contained" color="error">
        cancel
      </Button>
    </>
  );
  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography component="div" gutterBottom variant="h4">
              {name}
            </Typography>
            {edit ? (
              <EditableWidget
                description={newDescription}
                price={newPrice}
                onPriceChange= {onPriceChange}
                onDescriptionChange={onDescriptionChange}
              />
            ) : (
              displayFields
            )}
          </Stack>
          {edit ? editButtons : displayButtons}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DisplayWidget;
