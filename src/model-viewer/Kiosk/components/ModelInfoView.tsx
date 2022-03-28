import React, { useContext } from "react";
import { Model } from "@app/model-viewer/types";
import { Grid, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import { ModelLinkContext } from "@app/model-viewer/ModelLinkContext";

export default function ModelInfoView({ model }: { model: Model }) {
  const {
    title,
    school: { label },
  } = model;

  const { getModelUrl } = useContext(ModelLinkContext);
  const link = getModelUrl(model);
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
