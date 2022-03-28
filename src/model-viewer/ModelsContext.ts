import { createContext } from "react";
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
