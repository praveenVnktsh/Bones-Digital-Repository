import "./styles.css";
import React, { Component }  from 'react';
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./Cranial.glb");
  return (
    <>
      <primitive object={gltf.scene} scale={0.1} />
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <Canvas>
      <ambientLight intensity={1} />

        <Suspense fallback={null}>
          <Model />
          <OrbitControls />
          {/* <GroundPlane /> */}

        </Suspense>
      </Canvas>
    </div>
  );
}
