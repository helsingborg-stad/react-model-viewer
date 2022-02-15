/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

function ModelViewerElement({ gltf, usdz }: any) {
  return (
    <model-viewer
      src={gltf}
      ios-src={usdz}
      ar
      auto-rotate
      camera-controls
      background-color="#2EAFAC"
    />
  );
}

export default ModelViewerElement;
