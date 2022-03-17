import { ModelViewerElement } from "@app/components";
import React, { Card, CardContent, Grid, Typography } from "@mui/material";
import { AspectRatio } from "react-aspect-ratio";
import { Model } from "../types";

type ModelViewProps = {
  model: Model;
};
export default function ModelView({ model }: ModelViewProps) {
  const {
    id,
    title,
    src: { gltf, usdz },
    school: { label },
  } = model;
  return (
    <Card key={id}>
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h4" component="h1">
              {title}
            </Typography>
            <Typography variant="h6" component="div" color="text.secondary">
              {label}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <AspectRatio ratio="1/1">
              <ModelViewerElement {...{ gltf, usdz }} />
            </AspectRatio>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
