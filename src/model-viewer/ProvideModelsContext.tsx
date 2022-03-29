import React, { useContext, useEffect, useMemo, useState } from "react";
import { ModelLinkContext } from "./ModelLinkContext";
import ModelRepositoryContext from "./ModelRepositoryContext";
import ModelsContext, { ModelsContextType } from "./ModelsContext";

type ProvideModelsContextProps = {
  children: JSX.Element | JSX.Element[];
};

export default function ProvideModelsContext({
  children,
}: ProvideModelsContextProps) {
  const { models } = useContext(ModelRepositoryContext);
  const { getModelFromUrl } = useContext(ModelLinkContext);
  const [selectedModel, setSelectedModel] = useState(
    getModelFromUrl(models) || models[0] || null
  );

  const provider: ModelsContextType = useMemo(
    () => ({
      models,
      selectedModel,
      setSelectedModel,
    }),
    [models, selectedModel]
  );

  useEffect(() => {
    if (models.length && models.indexOf(selectedModel) < 0) {
      setSelectedModel(getModelFromUrl(models) || models[0]);
      // setSelectedModel(models[0]);
    }
  }, [getModelFromUrl, models, selectedModel]);

  // console.log("[ModelsContext]", provider);
  return (
    <ModelsContext.Provider value={provider}>{children}</ModelsContext.Provider>
  );
}
