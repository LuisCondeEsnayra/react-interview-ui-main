import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import WidgetCreation from "../WidgetCreation"
import WidgetCard from "../WidgetCard";
import { fetchAllWidgets } from "../../lib/apiConnect";

const WidgetList = () => {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    fetchAllWidgets()
      .then(setWidgets)
      .catch((error) => console.error("Error fetching widgets", error));
  }, []);

  const updateWidgets = () => {
    fetchAllWidgets()
      .then(setWidgets)
      .catch((error) => console.error("Error fetching widgets", error));
  };
  return (
    <>
      <WidgetCreation  onUpdateWidgets={updateWidgets} />
      <Stack
        spacing={4}
        sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h3">
          List of widgets:
        </Typography>
        <Grid
          container
          justifyContent="center"
          spacing={4}
          sx={{ paddingRight: 4, width: "100%" }}
        >
          {widgets.map((current, index) => (
            <WidgetCard key={index} widget={current}  onUpdateWidgets={updateWidgets}/>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default WidgetList;
