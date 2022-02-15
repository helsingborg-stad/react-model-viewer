import { Box } from "@app/components";
import { Canvas } from "@react-three/fiber";
import React from "react";

function ThreeDemoScreen() {
  return (
    <div>
      <h2>ThreeDemoScreen</h2>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default ThreeDemoScreen;
