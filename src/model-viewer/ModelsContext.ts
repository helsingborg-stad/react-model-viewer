import { createContext } from "react";
import { Model } from "./types";

export interface ModelsContextType {
  models: Model[];
  selectedModel: Model | null;
  setSelectedModel: (model: Model) => void;
  setSelectModelFromDeltaIndex: (deltaIndex: number) => void;
}

const ModelsContext = createContext<ModelsContextType>({
  models: [],
  selectedModel: null,
  setSelectedModel: () => undefined,
  setSelectModelFromDeltaIndex: () => undefined,
});

export default ModelsContext;
