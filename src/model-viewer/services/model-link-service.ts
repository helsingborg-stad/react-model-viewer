import { Model } from "../types";

type LinkableModel = Pick<Model, "id">;

export interface ModelLinkService {
  getModelFromUrl: <T extends LinkableModel>(models: T[]) => T | null;
  getModelUrl: (model: LinkableModel) => string;
}

const getBrowserUrl = () => new URL(window.location.href);

export default function createDefaultModelLinkService(
  getUrl: () => URL = getBrowserUrl
): ModelLinkService {
  return {
    getModelFromUrl: <T extends LinkableModel>(models: T[]) => {
      const id = getUrl()?.searchParams.get("model_id");
      return models.find((model) => model.id === id) || null;
    },
    getModelUrl: ({ id }: LinkableModel) => {
      const url = new URL(getUrl());
      url.searchParams.set("model_id", id);
      return url.href;
    },
  };
}
