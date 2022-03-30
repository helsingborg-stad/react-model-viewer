import React from "react";
import { Box, Typography } from "@mui/material";
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
    school: { label },
    featuredImage,
  } = model;
  return (
    <Box
      key={id}
      onClick={() => onSelect(model)}
      sx={{
        backgroundColor: isSelected ? "white" : "",
        cursor: "pointer",
      }}
    >
      <img
        alt=""
        src={featuredImage.src}
        srcSet={featuredImage.srcSet}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
      <Box
        sx={{
          backgroundColor: isSelected ? "white" : "",
          padding: "1em",
          margin: "1em",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {label}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
