/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { ARCanvas, useHitTest, DefaultXRControllers } from "@react-three/xr";
import * as THREE from "three";
import { Box } from "@app/components";

function HitTestExample() {
  const ref = React.useRef<THREE.Mesh>();

  useHitTest((hit) => {
    if (ref?.current) {
      hit.decompose(
        ref.current.position,
        new THREE.Quaternion().setFromEuler(ref.current.rotation),
        ref.current.scale
      );
    }
  });

  return <Box ref={ref} position={[1.2, 0, 0]} />;
}

function ReactThreeXrScreen() {
  return (
    <div>
      <h2>ReactThreeXrScreen</h2>
      <ARCanvas sessionInit={{ requiredFeatures: ["hit-test"] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <HitTestExample />
        <DefaultXRControllers />
      </ARCanvas>
    </div>
  );
}

export default ReactThreeXrScreen;
