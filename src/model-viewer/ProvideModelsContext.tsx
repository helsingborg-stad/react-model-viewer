import React, { useContext, useEffect, useMemo, useState } from "react";
import ModelRepositoryContext from "./ModelRepositoryContext";
import ModelsContext, { ModelsContextType } from "./ModelsContext";

type ProvideModelsContextProps = {
  children: JSX.Element | JSX.Element[];
};

export default function ProvideModelsContext({
  children,
}: ProvideModelsContextProps) {
  const { models } = useContext(ModelRepositoryContext);
  const [selectedModel, setSelectedModel] = useState(models[0] || null);

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
      setSelectedModel(models[0]);
    }
  }, [models, selectedModel]);

  // console.log("[ModelsContext]", provider);
  return (
    <ModelsContext.Provider value={provider}>{children}</ModelsContext.Provider>
  );
}
