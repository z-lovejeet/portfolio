'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, Sphere, Box, Torus, Icosahedron, Cone, Center } from '@react-three/drei';
import * as THREE from 'three';

// --- Scene 1: LMS Control Hub (Satellites orbiting a core) ---
function LMSScene() {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
            groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Core Hub */}
            <Sphere args={[0.8, 64, 64]}>
                <MeshTransmissionMaterial backside thickness={0.5} roughness={0.1} transmission={1} ior={1.2} color="#8b5cf6" />
            </Sphere>
            {/* Orbiting Satellites (Courses) */}
            {[0, 1, 2].map((i) => (
                <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
                    <Box args={[0.3, 0.3, 0.3]} position={[1.5, Math.sin(i), 0]}>
                        <MeshTransmissionMaterial backside thickness={0.1} roughness={0.2} transmission={1} ior={1.5} color="#c4b5fd" />
                    </Box>
                </group>
            ))}
        </group>
    );
}

// --- Scene 2: Commerce Planet (Rings and floating items) ---
function CommerceScene() {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
            groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            <Torus args={[1, 0.3, 64, 64]}>
                <MeshTransmissionMaterial backside thickness={0.4} roughness={0.1} transmission={1} ior={1.2} color="#0ea5e9" />
            </Torus>
            <Sphere args={[0.4, 32, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#bae6fd" roughness={0.2} metalness={0.8} />
            </Sphere>
        </group>
    );
}

// --- Scene 3: Algorithm Lab (Digital circuitry planet/node) ---
function AlgorithmScene() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <Icosahedron ref={meshRef} args={[1.2, 1]}>
            <MeshTransmissionMaterial backside thickness={0.5} roughness={0.05} transmission={1} ior={1.3} color="#10b981" wireframe={false} />
            {/* Inner glowing core */}
            <Sphere args={[0.6, 16, 16]} position={[0, 0, 0]}>
                <meshBasicMaterial color="#6ee7b7" wireframe={true} />
            </Sphere>
        </Icosahedron>
    );
}

// --- Scene 4: Kisan Mitra (Abstract tree / upward structure) ---
function KisanMitraScene() {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            <Cone args={[0.8, 1.5, 32]}>
                <MeshTransmissionMaterial backside thickness={0.5} roughness={0.15} transmission={1} ior={1.1} color="#f59e0b" />
            </Cone>
            {/* Floating marketplace cards */}
            {[0, 1, 2, 3].map((i) => (
                <Box key={i} args={[0.4, 0.4, 0.05]} position={[Math.cos(i * Math.PI / 2) * 1.2, 0.5 + Math.sin(i) * 0.5, Math.sin(i * Math.PI / 2) * 1.2]}>
                    <meshStandardMaterial color="#fde68a" roughness={0.1} metalness={0.5} />
                </Box>
            ))}
        </group>
    );
}

export default function ProjectScene({ type }: { type: 'lms' | 'commerce' | 'algorithm' | 'kisan' }) {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#4c1d95" />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
                    <Center>
                        {type === 'lms' && <LMSScene />}
                        {type === 'commerce' && <CommerceScene />}
                        {type === 'algorithm' && <AlgorithmScene />}
                        {type === 'kisan' && <KisanMitraScene />}
                    </Center>
                </Float>
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
