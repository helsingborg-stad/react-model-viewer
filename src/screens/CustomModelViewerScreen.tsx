import React from "react";
import { CustomModelViewer } from "@app/components";
import GLTF_BARNENS_H22 from "@assets/barnens_h22.glb";

function CustomModelViewerScreen() {
  return (
    <div>
      <h2>GLTFViewerScreen</h2>
      <div style={{ position: "relative", width: 600, height: 600 }}>
        <CustomModelViewer scale={40} modelPath={GLTF_BARNENS_H22} />
      </div>
    </div>
  );
}

export default CustomModelViewerScreen;
