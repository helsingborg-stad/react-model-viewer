import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { AspectRatio } from "react-aspect-ratio";
import { Model } from "../../types";

type ThumbnailProps = {
  model: Model;
  isSelected: boolean;
  onSelect: (model: Model) => void;
};

export default function ModelsNavigationModel({
  model,
  isSelected,
  onSelect,
}: ThumbnailProps) {
  const {
    id,
    title,
    school,
    src: { gltf, usdz },
  } = model;

  return (
    <Box
      key={id}
      onClick={() => onSelect(model)}
      sx={{
        cursor: "pointer",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: isSelected ? "black" : "var(--nav-bg-yellow)",
      }}
    >
      <AspectRatio ratio="16/9">
        <model-viewer
          src={gltf}
          ios-src={usdz}
          background-color="var(--nav-bg-yellow)"
        />
      </AspectRatio>
    </Box>
  );

  return (
    <Card key={id}>
      <CardActionArea
        sx={{
          bgcolor: isSelected ? "primary.main" : "",
        }}
        onClick={() => onSelect(model)}
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
