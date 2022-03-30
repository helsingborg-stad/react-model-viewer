import React, { useContext } from "react";
import ModelsContext from "../../ModelsContext";
import ModelInfoView from "./ModelInfoView";

export default function SelectedModelInfoView({
  verbose,
}: {
  verbose: boolean;
}) {
  const { selectedModel } = useContext(ModelsContext);
  return (
    selectedModel && <ModelInfoView model={selectedModel} verbose={verbose} />
  );
}
