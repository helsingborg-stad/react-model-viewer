import React from "react";
import { Model } from "@app/model-viewer/types";
import { Grid, Typography } from "@mui/material";
import QRCode from "react-qr-code";

const createModelLink = (id: string) => {
  const url = new URL(document.location.href);
  url.searchParams.set("model_id", id);
  return url.href;
};

export default function ModelInfoView({ model }: { model: Model }) {
  const {
    id,
    title,
    school: { label },
  } = model;
  const link = createModelLink(id);
  return (
    <Grid container spacing={2}>
      <Grid item>
        <QRCode size={64} value={link} />
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
