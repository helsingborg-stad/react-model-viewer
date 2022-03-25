import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ModelRepositoryContext from "./ModelRepositoryContext";
import { Model } from "./types";

export interface ModelsContextType {
  models: Model[];
  selectedModel: Model | null;
  setSelectedModel: (model: Model) => void;
}

const ModelsContext = createContext<ModelsContextType>({
  models: [],
  selectedModel: null,
  setSelectedModel: () => undefined,
});

export default ModelsContext;

type ProvideModelsContextProps = {
  children: JSX.Element | JSX.Element[];
};

export function ProvideModelsContext({ children }: ProvideModelsContextProps) {
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
