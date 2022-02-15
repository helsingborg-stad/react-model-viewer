/* eslint-disable react/default-props-match-prop-types */
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GLTFModel from "@components/GLTFModel";

type Props = {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
};

const defaultProps = {
  scale: 40,
  position: [0, 0, 0],
};

function CustomModelViewer({ modelPath, scale, position }: Props) {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <GLTFModel
          modelPath={modelPath}
          scale={scale as number}
          position={position as [number, number, number]}
        />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
CustomModelViewer.defaultProps = defaultProps;

export default CustomModelViewer;
