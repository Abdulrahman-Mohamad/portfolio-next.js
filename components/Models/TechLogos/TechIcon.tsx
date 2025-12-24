"use client";

import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { type TechStackIcon } from "@/constants";

interface TechIconProps {
  model: TechStackIcon;
}

// Inner component that uses the GLTF hook
function TechIconInner({ model }: TechIconProps) {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.name === 'Interactive Developer') {
      scene.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && child.name === 'Object_5') {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({ color: 'white' });
        }
      });
    }
  }, [model.name, scene.scene]);

  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="city" />

      <OrbitControls enableZoom={false} />
      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group scale={model.scale}>
          <primitive object={scene.scene} rotation={model.rotation} />
        </group>
      </Float>
    </Canvas>
  );
}

// Wrapper component to prevent SSR issues
export default function TechIcon({ model }: TechIconProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-full bg-transparent" />;
  }

  return <TechIconInner model={model} />;
}