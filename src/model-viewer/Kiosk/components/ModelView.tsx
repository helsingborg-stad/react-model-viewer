import React, { useRef } from "react";
import { Model } from "@app/model-viewer/types";
// import { ModelViewerElement } from ".model-viewer/ModelViewerElement";

export default function ModelView({ model }: { model: Model }) {
  const {
    id,
    src: { gltf, usdz },
    featuredImage,
  } = model;
  const arButtonRef = useRef<HTMLButtonElement>(null);
  const modelViewerTransform = document.querySelector("model-viewer#transform") as any;

  const handleButtonClick = () => {
    if(modelViewerTransform){
    modelViewerTransform.scale = `.01 .01 .01`;
    }
  }

  return (
    <model-viewer
      id = "transform"
      key={id}
      data-testid={`model-viewer-for-${id}`}
      src={gltf}
      ios-src={gltf}
      ar
      auto-rotate
      camera-controls
      shadow-intensity="1"
      background-color="unset"
      poster={featuredImage.src}
    >
      <button
        type="button"
        slot="ar-button"
        ref={arButtonRef}
        onClick={handleButtonClick}
        style={{
          backgroundColor: "white",
          borderRadius: "4px",
          border: "none",
          position: "absolute",
          top: "16px",
          right: "16px",
          padding: "8px",
        }}
      >
        Visa i verkligheten
      </button>
    </model-viewer>
  );
}