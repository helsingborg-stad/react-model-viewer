import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import QRCode from "react-qr-code";
import ModelsContext from "../ModelsContext";

export default function SelectedModelInfoView() {
  const { selectedModel } = useContext(ModelsContext);
  if (!selectedModel) {
    return null;
  }

  const {
    title,
    school: { label },
  } = selectedModel;

  return (
    <Grid container spacing={2}>
      <Grid item>
        <QRCode size={64} value="apa" />
      </Grid>
      <Grid item>
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {label}
        </Typography>
      </Grid>
    </Grid>
  );
}
