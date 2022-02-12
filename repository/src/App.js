import "./styles.css";
import React, { Component } from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import 'bootstrap/dist/css/bootstrap.min.css';

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./Cranial.glb");
  return (
    <>
      <primitive object={gltf.scene} scale={0.1} />
    </>
  );
};

export default function App() {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <div className="App">
      <Overlay target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            Simple tooltip
          </div>
        )}
      </Overlay>
      
      <Canvas>
        <ambientLight intensity={1} />

        <Suspense fallback={null}>
          <Model />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
