import { queryModels } from "@app/services/ModelService";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import ModelRepositoryContext, {
  ModelRepositoryContextType,
} from "../ModelRepositoryContext";

type ProvideGQLModelRepositoryContextProps = {
  children: JSX.Element | JSX.Element[];
  // eslint-disable-next-line react/require-default-props
  overrideForDebugPurposes: ModelRepositoryContextType;
};

export default function ProvideGQLModelRepositoryContext({
  children,
  overrideForDebugPurposes,
}: ProvideGQLModelRepositoryContextProps) {
  
  const { isLoading, isError, data, error } = useQuery("models", queryModels);

  const provider: ModelRepositoryContextType = useMemo(
    () => ({
      // isLoading,
      // isError,
      // error,
      // models: data || [],
      ...overrideForDebugPurposes,
    }),
    [overrideForDebugPurposes]
  );
  // console.log("[ModelRepositoryContext]", provider);

  return (
    <ModelRepositoryContext.Provider value={provider}>
      {children}
    </ModelRepositoryContext.Provider>
  );
}
