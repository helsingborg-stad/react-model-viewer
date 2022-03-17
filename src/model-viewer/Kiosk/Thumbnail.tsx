import React, { useContext } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { AspectRatio } from "react-aspect-ratio";
import { Model } from "../types";
import ModelsContext from "../ModelsContext";

type ThumbnailProps = {
  model: Model;
};

export default function Thumbnail({ model }: ThumbnailProps) {
  const { selectedModel, setSelectedModel } = useContext(ModelsContext);
  const {
    id,
    title,
    school,
    src: { gltf, usdz },
  } = model;
  const isSelected = model === selectedModel;
  return (
    <Card key={id}>
      <CardActionArea
        sx={{
          bgcolor: isSelected ? "primary.main" : "",
        }}
        onClick={() => setSelectedModel(model)}
      >
        <AspectRatio ratio="16/9">
          <model-viewer src={gltf} ios-src={usdz} background-color="#2EAFAC" />
        </AspectRatio>
        <CardContent>
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {school.label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
