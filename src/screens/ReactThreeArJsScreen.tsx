import { Box, GLTFModel } from "@app/components";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";

import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import Pattern from "@assets/pattern-pattern-ar-marker-simple-512.patt";
import GLTF_MYNT from "@assets/mynt.glb";
import GLTF_BARNENS_H22 from "@assets/barnens_h22.glb";

function ReactThreeArJsScreen() {
  const [markerFound, setMarkerFound] = useState(false);

  return (
    <div>
      <h2>ReactThreeArJsScreen</h2>
      <h2>{markerFound ? "FOUND MARKER!" : "NO MARKER"}</h2>
      <ARCanvas
        camera={{ position: [0, 0, 0] }}
        dpr={window.devicePixelRatio}
        onCreated={({ gl }: any) => {
          if (gl?.setSize) {
            gl.setSize(window.innerWidth, window.innerHeight);
          }
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 0]} />
        <ARMarker
          type="pattern"
          patternUrl={Pattern}
          onMarkerFound={() => {
            setMarkerFound(true);
          }}
          onMarkerLost={() => {
            setMarkerFound(false);
          }}
        >
          <Suspense fallback={null}>
            {/* <Model3D source={GLTF_MYNT} /> */}
            <GLTFModel
              modelPath={GLTF_BARNENS_H22}
              scale={0.1}
              position={[0, 0, 0]}
            />
          </Suspense>
          {/* <mesh>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="green" />
          </mesh> */}
        </ARMarker>
      </ARCanvas>
    </div>
  );
}

export default ReactThreeArJsScreen;
