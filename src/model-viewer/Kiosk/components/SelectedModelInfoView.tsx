import React, { useContext } from "react";
import ModelsContext from "../../ModelsContext";
import ModelInfoView from "./ModelInfoView";

export default function SelectedModelInfoView({
  isMobile,
}: {
  isMobile: boolean;
}) {
  const { selectedModel } = useContext(ModelsContext);
  return (
    selectedModel && <ModelInfoView model={selectedModel} isMobile={isMobile} />
  );
}
