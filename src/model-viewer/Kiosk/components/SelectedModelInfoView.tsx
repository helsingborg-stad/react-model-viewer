import React, { useContext } from "react";
import ModelsContext from "../../ModelsContext";
import ModelInfoView from "./ModelInfoView";

export default function SelectedModelInfoView() {
  const { selectedModel } = useContext(ModelsContext);
  return selectedModel && <ModelInfoView model={selectedModel} />;
}
