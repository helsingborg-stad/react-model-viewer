import { Alert, LinearProgress } from "@mui/material";
import React, { useContext } from "react";
import ModelRepositoryContext from "../ModelRepositoryContext";
import ModelsContext from "../ModelsContext";

export default function SelectedModelView() {
  const { isLoading, isError } = useContext(ModelRepositoryContext);
  const { selectedModel } = useContext(ModelsContext);
  return (
    <>
      {isLoading && <LinearProgress />}
      {isError && <Alert severity="error">Error</Alert>}
      {selectedModel && (
        <model-viewer
          src={selectedModel.src.gltf}
          ios-src={selectedModel.src.usdz}
          ar
          auto-rotate
          camera-controls
          shadow-intensity="1"
          background-color="#2EAFAC"
        />
      )}
    </>
  );
}
