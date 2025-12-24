import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from "three"



export default function TechIcon({ model }) {
    const scene = useGLTF(model.modelPath)

    useEffect(() => {
        if (model.name === 'Interactive Developer') {
            scene.scene.traverse((child) => {
                if (child.isMesh && child.name === 'Object_5') {
                    child.material = new THREE.MeshStandardMaterial({ color: 'white' })
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>
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
    </>
}