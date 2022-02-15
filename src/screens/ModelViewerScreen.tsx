import React from "react";
import { ModelViewerElement } from "@app/components";

import GLTF_BARNENS_H22 from "@assets/barnens_h22.glb";
import USDZ_BARNENS_H22 from "@assets/barnens_h22.usdz";
import GLTF_MYNT from "@assets/mynt.glb";
import USDZ_MYNT from "@assets/mynt.usdz";

type Props = {
  gltf: string;
  usdz?: string | false;
};

const defaultProps = {
  usdz: false,
};

function ModelViewerScreen({ gltf, usdz }: Props) {
  return (
    <div>
      {/* <h2>ModelViewerScreen</h2> */}
      <div
        style={{
          position: "relative",
          width: 800,
          maxWidth: "100vw",
          height: 800,
          maxHeight: "90vh",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <ModelViewerElement gltf={gltf} usdz={usdz} />
      </div>
    </div>
  );
}

ModelViewerScreen.defaultProps = defaultProps;

export default ModelViewerScreen;

export function ModelViewerScreenWithMynt(): JSX.Element {
  return <ModelViewerScreen gltf={GLTF_MYNT} usdz={USDZ_MYNT} />;
}
export function ModelViewerScreenWithH22(): JSX.Element {
  return <ModelViewerScreen gltf={GLTF_BARNENS_H22} usdz={USDZ_BARNENS_H22} />;
}
