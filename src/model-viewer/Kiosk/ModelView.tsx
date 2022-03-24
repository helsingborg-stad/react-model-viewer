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
          <Grid item xs={12}>
            <AspectRatio ratio="1/1" style={{ maxHeight: "100vh" }}>
              <ModelViewerElement
                {...{ gltf, usdz }}
                sx={{ maxHeight: "50vh" }}
              />
            </AspectRatio>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
