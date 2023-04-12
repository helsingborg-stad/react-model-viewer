import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ModelLinkContext } from "./ModelLinkContext";
import ModelRepositoryContext from "./ModelRepositoryContext";
import ModelsContext, { ModelsContextType } from "./ModelsContext";
import { Model } from "./types";

type ProvideModelsContextProps = {
  children: JSX.Element | JSX.Element[];
};

function getItemFromDelta<T>(
  items: T[],
  current: T | null,
  delta: number
): T | null {
  const next =
    current && items.length
      ? (items.length + items.indexOf(current) + delta) % items.length
      : 0;
  return items[next] || null;
}

export default function ProvideModelsContext({
  children,
}: ProvideModelsContextProps) {
  const { models } = useContext(ModelRepositoryContext);
  const { getModelFromUrl } = useContext(ModelLinkContext);
  const [selectedModel, setSelectedModel] = useState<Model | null>(
    getModelFromUrl(models) || models[0] || null
  );
  const setSelectModelFromDeltaIndex = useCallback(
    (deltaIndex: number) =>
      setSelectedModel(getItemFromDelta(models, selectedModel, deltaIndex)),
    [models, selectedModel]
  );
  const provider: ModelsContextType = useMemo(
    () => ({
      models,
      selectedModel,
      setSelectedModel,
      setSelectModelFromDeltaIndex,
    }),
    [models, selectedModel, setSelectModelFromDeltaIndex]
  );

  useEffect(() => {
    if (models.length && !selectedModel) {
      setSelectedModel(getModelFromUrl(models) || models[0]);
    }
  }, [getModelFromUrl, models, selectedModel]);

  // console.log("[ModelsContext]", provider);
  return (
    <ModelsContext.Provider value={provider}>{children}</ModelsContext.Provider>
  );
}
