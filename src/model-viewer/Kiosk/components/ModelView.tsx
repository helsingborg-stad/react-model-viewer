import React from "react";
import { Model } from "@app/model-viewer/types";

export default function ModelView({ model }: { model: Model }) {
  const {
    id,
    src: { gltf, usdz },
    featuredImage,
  } = model;
  return (
    <model-viewer
      key={id}
      data-testid={`model-viewer-for-${id}`}
      src={gltf}
      ios-src={usdz}
      ar
      auto-rotate
      camera-controls
      shadow-intensity="1"
      background-color="unset"
      poster={featuredImage.src}
    />
  );
}
