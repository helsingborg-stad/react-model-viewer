import React from "react";
import { Box, Typography } from "@mui/material";
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
    src: { image },
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
        src={
          image ||
          "https://helsingborg.se/wp-content/uploads/2017/05/h22_mittpuff-1920x1080px.jpg"
        }
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
