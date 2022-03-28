import { createContext } from "react";
import { Model } from "./types";

export interface ModelLinkContextType {
  getModelFromUrl: (models: Model[]) => Model | null;
  getModelUrl: (model: Model) => string;
}

function raise(message: string): null {
  throw new Error(message);
}

export const ModelLinkContext = createContext<ModelLinkContextType>({
  getModelFromUrl: () => raise("getModelFromUrl() is not implemented"),
  getModelUrl: () => raise("getModelUrl() is not implemented") || "",
});
