import { Typography } from "@mui/material";
import React, { useContext } from "react";
import ModelsContext from "../ModelsContext";

export default function SelectedModelInfoView() {
  const { selectedModel } = useContext(ModelsContext);
  return selectedModel ? <Typography>{selectedModel.title}</Typography> : null;
}
