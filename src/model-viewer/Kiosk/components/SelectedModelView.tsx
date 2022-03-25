import React, { useContext } from "react";
import ModelsContext from "../../ModelsContext";
import ModelView from "./ModelView";

export default function SelectedModelView() {
  const { selectedModel } = useContext(ModelsContext);
  return selectedModel ? <ModelView model={selectedModel} /> : null;
}
