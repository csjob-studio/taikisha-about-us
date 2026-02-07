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

// function Marker({ lat, lng, Office, company, city, country, address, phone, fax, radius, isActive, onClick, onPointerOver, onPointerOut }: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
//     const position = useMemo(() => calcPosFromLatLonRad(lat, lng, radius), [lat, lng, radius]);
//     const [hovered, setHover] = useState(false);

//     // Change cursor on hover
//     useCursor(hovered);

//     // Pin visual parameters (reduced slightly)
//     const pinHeight = 0.12;     // was 0.15
//     const pinRadius = 0.016;   // was 0.02
//     const headRadius = 0.065;  // was 0.08


//     // Calculate rotation to stand upright on the sphere surface
//     const quaternion = useMemo(() => {
//         const dummy = new THREE.Object3D();
//         dummy.position.set(position[0], position[1], position[2]);
//         dummy.lookAt(0, 0, 0); // Look at center of earth
//         return dummy.quaternion;
//     }, [position]);

//     return (
//         <group position={position} quaternion={quaternion}>
//             {/* Pin Stem (Line) */}
//             <mesh position={[0, 0, -pinHeight / 2]}> {/* Move back along local Z to sit on surface */}
//                 <cylinderGeometry args={[pinRadius, pinRadius, pinHeight, 8]} />
//                 <meshBasicMaterial
//                     color={hovered || isActive ? "#ef4444" : "#dc2626"} // red-500 / red-600
//                 />

//             </mesh>

//             {/* Pin Head (Outer) */}
//             <mesh
//                 position={[0, 0, -pinHeight]}
//                 onClick={onClick}
//                 onPointerOver={(e) => {
//                     e.stopPropagation();
//                     setHover(true);
//                     onPointerOver();
//                 }}
//                 onPointerOut={() => {
//                     setHover(false);
//                     onPointerOut();
//                 }}
//             >
//                 <sphereGeometry args={[headRadius, 16, 16]} />
//                 <meshStandardMaterial
//                     color={hovered || isActive ? "#ef4444" : "#9e0000"}
//                     emissive={hovered || isActive ? "#ef4444" : "#991b1b"}
//                     emissiveIntensity={2}
//                 />
//             </mesh>

//             {/* Pin Head (Outer) */}
//             <mesh
//                 position={[0, 0, -pinHeight]}
//                 onClick={onClick}
//                 onPointerOver={(e) => {
//                     e.stopPropagation();
//                     setHover(true);
//                     onPointerOver();
//                 }}
//                 onPointerOut={() => {
//                     setHover(false);
//                     onPointerOut();
//                 }}
//             >
//                 <sphereGeometry args={[headRadius, 16, 16]} />
//                 <meshStandardMaterial
//                     color={hovered || isActive ? "#ef4444" : "#9e0000"}
//                     emissive={hovered || isActive ? "#ef4444" : "#991b1b"}
//                     emissiveIntensity={2}
//                 />
//             </mesh>

//             {/* Inner Black Dot */}
//             <mesh
//                 position={[0, 0, -pinHeight + headRadius * 0.35]}
//                 raycast={() => null} // ⬅ prevents event interference
//             >
//                 <sphereGeometry args={[headRadius * 0.25, 12, 12]} />
//                 <meshStandardMaterial
//                     color="#000000"
//                     emissive="#000000"
//                     emissiveIntensity={0}
//                 />
//             </mesh>





//             {/* Popover / Tooltip */}
//             {(hovered || isActive) && (
//                 // <Html position={[0, 0, -pinHeight * 1.5]} style={{ pointerEvents: 'none' }}>
//                 <Html position={[0, 0, -pinHeight * 1.5]} style={{ pointerEvents: 'none' }}>
//                     <div className="bg-slate-900/95 text-white p-2 rounded-md border border-blue-500/30 backdrop-blur-md shadow-xl w-56 transform -translate-x-1/2 -translate-y-full pointer-events-auto text-left">


//                         <div className="border-b border-white/20 pb-1 mb-1.5">
//                             <h4 className="font-bebas text-base tracking-widest text-yellow-500 leading-none mb-0.5 whitespace-normal">
//                                 {Office}
//                             </h4>
//                             <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">
//                                 {company}
//                             </p>
//                             <span className="text-[9px] font-bold text-white bg-blue-800 px-1 py-0.5 rounded inline-block leading-none mt-1">
//                                 {city}, {country}
//                             </span>
//                         </div>
//                         <div className="space-y-0.5 text-[11px] text-blue-100 font-light leading-snug">
//                             <p className="opacity-90 max-h-20 overflow-hidden leading-relaxed">
//                                 {address}
//                             </p>
//                             {(phone || fax) && (
//                                 <div className="flex flex-col mt-1 border-t border-white/10 pt-1">
//                                     {phone && <p><span className="font-semibold text-blue-400">Tel:</span> {phone}</p>}
//                                     {fax && <p><span className="font-semibold text-blue-400">Fax:</span> {fax}</p>}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </Html>
//             )}
//         </group>
//     );
// }

function Marker({ lat, lng, Office, company, city, country, address, phone, fax, radius, isActive, onClick, onPointerOver, onPointerOut }: any) {
    const position = useMemo(() => calcPosFromLatLonRad(lat, lng, radius), [lat, lng, radius]);
    const [hovered, setHover] = useState(false);
    const ringRef = useRef<THREE.Mesh>(null);

    useCursor(hovered);

    // Visual parameters
    const pinHeight = 0.2;
    const headRadius = 0.07;

    // Use a local internal clock for the pulse effect
    // This adds the "Sonar" animation at the base of the pin
    const [pulseTime, setPulseTime] = useState(0);
    React.useEffect(() => {
        let frame: number;
        const animate = (t: number) => {
            setPulseTime(t / 1000);
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    const ringScale = 1 + (pulseTime * 2 % 1.5);
    const ringOpacity = 0.5 * (1 - (pulseTime * 2 % 1.5) / 1.5);

    const quaternion = useMemo(() => {
        const dummy = new THREE.Object3D();
        dummy.position.set(position[0], position[1], position[2]);
        dummy.lookAt(0, 0, 0); 
        return dummy.quaternion;
    }, [position]);

    const isActiveColor = "#00cf23";

    return (
        <group position={position} quaternion={quaternion}>
            {/* 1. Pulsing Ground Ring (Sonar Effect) */}
            <mesh scale={[ringScale, ringScale, 1]}>
                <ringGeometry args={[0.08, 0.12, 32]} />
                <meshBasicMaterial 
                    color={isActive ? isActiveColor : "#9660fa"} 
                    transparent 
                    opacity={ringOpacity} 
                />
            </mesh>

            {/* 2. Tapered Pin Stem (Sharp Point) */}
            <mesh position={[0, 0, -pinHeight / 2]} rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.015, pinHeight, 12]} />
                <meshStandardMaterial 
                    color={hovered || isActive ? isActiveColor : "#ffffff"} 
                    emissive={hovered || isActive ? isActiveColor : "#ffffff"}
                    emissiveIntensity={isActive ? 2 : 0.5}
                />
            </mesh>

            {/* 3. Floating Pin Head with Inner Dot */}
            <group position={[0, 0, -pinHeight]}>
                <mesh
                    onClick={onClick}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        setHover(true);
                        onPointerOver();
                    }}
                    onPointerOut={() => {
                        setHover(false);
                        onPointerOut();
                    }}
                >
                    <sphereGeometry args={[headRadius, 20, 20]} />
                    <meshStandardMaterial
                        color={hovered || isActive ? isActiveColor : "#dc2626"}
                        emissive={hovered || isActive ? isActiveColor : "#991b1b"}
                        emissiveIntensity={isActive ? 4 : 1}
                    />
                </mesh>
                
                {/* Visual Detail: Small center dot on the pin head */}
                <mesh position={[0, 0, -headRadius * 0.5]}>
                    <sphereGeometry args={[headRadius * 0.3, 12, 12]} />
                    <meshBasicMaterial color="#000000" />
                </mesh>
            </group>

            {/* Popover / Tooltip - Kept EXACTLY like your working version */}
            {(hovered || isActive) && (
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

    const [colorMap, normalMap] = useLoader(THREE.TextureLoader, [
        '/images/scene5/earth-texture.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'
    ]);

    return (
        <group ref={globeRef} scale={0.7}>
            {/* Background Earth mesh */}
            <mesh>
                <sphereGeometry args={[2, 64, 64]} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    roughness={0.6}
                    metalness={0.05}
                />
            </mesh>

            {locations.map((loc, i) => (
                <Marker
                    key={i}
                    {...loc}
                    radius={2.01}
                    isActive={activeLocation === loc.Office}
                    onClick={(e: any) => {
                        e.stopPropagation();
                        // Clicking sets the new active location
                        setActiveLocation(loc.Office);
                    }}
                    onPointerOver={() => {
                        // 1. Pause rotation
                        setAutoRotate(false);
                        // 2. Switching the active popup immediately on hover
                        setActiveLocation(loc.Office);
                    }}
                    onPointerOut={() => {
                        // Resume rotation
                        setAutoRotate(true);
                        // NOTE: We do NOT set activeLocation to null here 
                        // so the last hovered/clicked one stays open.
                    }}
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
            <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff05" />
            <directionalLight position={[-5, -3, -5]} intensity={0.9} color="#93c5fd" />
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
    // Start with the first office open
    const [activeLocation, setActiveLocation] = useState<string | null>(locations[0].Office);

    return (
        <div className="w-full h-full relative z-20 transition-all duration-300 ease-out animate-in fade-in zoom-in-95">
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 45 }}
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
            >
                <GlobeErrorBoundary fallback={<GlobeFallback />}>
                    <Suspense fallback={null}>
                        <GlobeContent 
                            activeLocation={activeLocation} 
                            setActiveLocation={setActiveLocation} 
                        />
                    </Suspense>
                </GlobeErrorBoundary>
            </Canvas>
        </div>
    );
}









