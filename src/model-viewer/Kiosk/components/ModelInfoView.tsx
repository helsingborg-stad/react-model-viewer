import React from "react";
import { Model } from "@app/model-viewer/types";
import { Grid, Typography } from "@mui/material";
import QRCode from "react-qr-code";

export default function ModelInfoView({ model }: { model: Model }) {
  const {
    id,
    title,
    school: { label },
  } = model;

  return (
    <Grid container spacing={2}>
      <Grid item>
        <QRCode size={64} value={document.location.href + id} />
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
