'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

// Helper: Convert Lat/Lon to 3D Position on Sphere
// Helper: Convert Lat/Lon to 3D Position on Sphere
const calcPosFromLatLonRad = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return [x, y, z] as [number, number, number];
};

import { companyLocations } from '../data/companyData';
const locations = companyLocations;

function Marker({ lat, lng, Office, company, city, country, address, phone, fax, radius, isActive, onClick, onPointerOver, onPointerOut }: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const position = useMemo(() => calcPosFromLatLonRad(lat, lng, radius), [lat, lng, radius]);
    const [hovered, setHover] = useState(false);

    // Change cursor on hover
    useCursor(hovered);

    // Pin visual parameters
    const pinHeight = 0.15;
    const pinRadius = 0.02;
    const headRadius = 0.08;

    // Calculate rotation to stand upright on the sphere surface
    const quaternion = useMemo(() => {
        const dummy = new THREE.Object3D();
        dummy.position.set(position[0], position[1], position[2]);
        dummy.lookAt(0, 0, 0); // Look at center of earth
        return dummy.quaternion;
    }, [position]);

    return (
        <group position={position} quaternion={quaternion}>
            {/* Pin Stem (Line) */}
            <mesh position={[0, 0, -pinHeight / 2]}> {/* Move back along local Z to sit on surface */}
                <cylinderGeometry args={[pinRadius, pinRadius, pinHeight, 8]} />
                <meshBasicMaterial color={hovered || isActive ? "#fbbf24" : "#60a5fa"} />
            </mesh>

            {/* Pin Head (Dot) */}
            <mesh
                position={[0, 0, -pinHeight]} // Top of the stem
                onClick={onClick}
                onPointerOver={(e) => { e.stopPropagation(); setHover(true); onPointerOver(); }}
                onPointerOut={() => { setHover(false); onPointerOut(); }}
            >
                <sphereGeometry args={[headRadius, 16, 16]} />
                <meshStandardMaterial
                    color={hovered || isActive ? "#fbbf24" : "#eff6ff"}
                    emissive={hovered || isActive ? "#fbbf24" : "#2563eb"}
                    emissiveIntensity={2}
                />
            </mesh>

            {/* Popover / Tooltip */}
            {(hovered || isActive) && (
                // <Html position={[0, 0, -pinHeight * 1.5]} style={{ pointerEvents: 'none' }}>
                <Html position={[0, 0, -pinHeight * 1.5]} style={{ pointerEvents: 'none' }}>
                    <div className="bg-slate-900/95 text-white p-2 rounded-md border border-blue-500/30 backdrop-blur-md shadow-xl w-56 transform -translate-x-1/2 -translate-y-full pointer-events-auto text-left">


                        <div className="border-b border-white/20 pb-1 mb-1.5">
                            <h4 className="font-bebas text-base tracking-widest text-yellow-500 leading-none mb-0.5 whitespace-normal">
                                {Office}
                            </h4>
                            <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">
                                {company}
                            </p>
                            <span className="text-[9px] font-bold text-white bg-blue-800 px-1 py-0.5 rounded inline-block leading-none mt-1">
                                {city}, {country}
                            </span>
                        </div>
                        <div className="space-y-0.5 text-[11px] text-blue-100 font-light leading-snug">
                            <p className="opacity-90 max-h-20 overflow-hidden leading-relaxed">
                                {address}
                            </p>
                            {(phone || fax) && (
                                <div className="flex flex-col mt-1 border-t border-white/10 pt-1">
                                    {phone && <p><span className="font-semibold text-blue-400">Tel:</span> {phone}</p>}
                                    {fax && <p><span className="font-semibold text-blue-400">Fax:</span> {fax}</p>}
                                </div>
                            )}
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}

interface GlobeContentProps {
    activeLocation: string | null;
    setActiveLocation: (name: string | null) => void;
}

function GlobeContent({ activeLocation, setActiveLocation }: GlobeContentProps) {
    const globeRef = useRef<THREE.Group>(null);
    const [autoRotate, setAutoRotate] = useState(true);

    // Load Earth Texture (Using local satellite texture)
    const [colorMap, normalMap] = useLoader(THREE.TextureLoader, [
        '/images/scene5/earth-texture.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'
    ]);

    return (
        <group ref={globeRef} scale={0.7}>
            {/* The Earth Sphere */}
            <mesh onClick={(e) => { e.stopPropagation(); setActiveLocation(null); }}>
                <sphereGeometry args={[2, 64, 64]} />
                {/* <meshPhongMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    specularMap={specularMap}
                    specular={new THREE.Color(0x555555)}
                    shininess={25}
                /> */}
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    roughness={0.6}
                    metalness={0.05}
                    emissive={new THREE.Color('#ffffff00')}
                    emissiveIntensity={0}
                />

            </mesh>

            {/* Render Markers */}
            {locations.map((loc, i) => (
                <Marker
                    key={i}
                    {...loc}
                    radius={2.01}
                    isActive={activeLocation === loc.Office} // Use Office as ID
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={(e: any) => {
                        e.stopPropagation();
                        // Toggle: if clicked active, close it; otherwise open it
                        setActiveLocation(activeLocation === loc.Office ? null : loc.Office);
                    }}
                    onPointerOver={() => setAutoRotate(false)} // Pause rotation on hover
                    onPointerOut={() => setAutoRotate(true)}
                />
            ))}

            <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate={autoRotate}
                autoRotateSpeed={0.8}
                minPolarAngle={Math.PI / 3.5}
                maxPolarAngle={Math.PI - Math.PI / 3}
            />

            <ambientLight intensity={1} />

            <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                color="#ffffff05"
            />

            <directionalLight
                position={[-5, -3, -5]}
                intensity={0.9}
                color="#93c5fd"
            />


        </group>
    );
}

// Simple Error Boundary Component
class GlobeErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode, fallback: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: any, errorInfo: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        console.error("Globe3D Error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

// Fallback Globe (No Textures)
function GlobeFallback() {
    return (
        <mesh>
            <sphereGeometry args={[2, 64, 64]} />
            <meshPhongMaterial color="#1e293b" emissive="#0f172a" specular="#111827" shininess={10} transparent opacity={0.9} />
        </mesh>
    );
}

export default function Globe3D() {
    const [activeLocation, setActiveLocation] = useState<string | null>(locations[0].Office); // Use Office as default

    return (
        // ... (Canvas remains same)
        <div className="w-full h-full relative z-20">
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 45 }}
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: true }}
                onCreated={({ gl }) => {
                    gl.toneMappingExposure = 1.25;
                }}
                style={{ background: 'transparent' }}
                onPointerMissed={() => setActiveLocation(null)} // Close on click outside (empty space)
            >
                <GlobeErrorBoundary fallback={<GlobeFallback />}>
                    <Suspense fallback={null}>
                        <GlobeContent activeLocation={activeLocation} setActiveLocation={setActiveLocation} />
                    </Suspense>
                </GlobeErrorBoundary>
            </Canvas>
        </div>







    );
}
