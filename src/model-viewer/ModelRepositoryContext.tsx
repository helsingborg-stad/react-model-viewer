import { createContext } from "react";
import { Model } from "./types";

export interface ModelRepositoryContextType {
  models: Model[];
  error: unknown;
  isLoading: boolean;
  isError: boolean;
}

const ModelRepositoryContext = createContext<ModelRepositoryContextType>({
  models: [],
  error: null,
  isLoading: false,
  isError: false,
});

export default ModelRepositoryContext;
