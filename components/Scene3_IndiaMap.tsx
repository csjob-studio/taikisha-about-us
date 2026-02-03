"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Configuration ---
// Grouped projects for sequential "CameraFocus" logic
// Map is 600x600 natural. 540 is approx centery.
// Top focus: Show ~top half.
// Bottom focus: Show ~bottom half.

interface Project {
    id: string;
    name: string;
    img: string;
    style: React.CSSProperties; // Explicitly type using React.CSSProperties
    path: string;
    color: string;
}

interface ProjectGroup {
    phase: string;
    items: Project[];
}

const projectGroups: ProjectGroup[] = [
    // GROUP 1: TOP (North India)
    {
        phase: "top",
        items: [
            {
                id: "p1",
                name: "Gurugram (HQ)",
                img: "/images/scene3/project-1.png",
                style: { top: "15%", left: "10%" },
                path: "M960,540 C850,500 600,300 350,250",
                color: "#FACC15",
            },
            {
                id: "p2",
                name: "Electrical & Automation Plant, Manesar",
                img: "/images/scene3/project-2.png",
                style: { top: "20%", right: "15%" },
                path: "M960,540 C1050,500 1400,350 1600,300",
                color: "#FACC15",
            },
        ]
    },
    // GROUP 2: MIDDLE (West/Central)
    {
        phase: "center",
        items: [
            {
                id: "p5",
                name: "Conveyor Factory, Bhosari, Pune",
                img: "/images/scene3/project-5.png",
                style: { top: "50%", left: "5%" },
                path: "M960,540 C700,540 400,500 150,540",
                color: "#FACC15",
            },
            {
                id: "p6",
                name: "Sheet Metal & Mfg. Plant, Pune",
                img: "/images/scene3/project-6.png",
                style: { top: "50%", right: "5%" },
                path: "M960,540 C1200,540 1600,500 1770,540",
                color: "#FACC15",
            },
        ]
    },
    // GROUP 3: BOTTOM (South/West)
    {
        phase: "bottom",
        items: [
            {
                id: "p3",
                name: "Sheet Metal & Mfg. Plant, Vadodara",
                img: "/images/scene3/project-3.png",
                style: { bottom: "10%", left: "10%" },
                path: "M960,540 C800,600 500,800 250,850",
                color: "#FACC15",
            },
            {
                id: "p4",
                name: "Nexcel Technical Center, Manesar",
                img: "/images/scene3/project-4.png",
                style: { bottom: "10%", right: "10%" },
                path: "M960,540 C1100,650 1500,800 1700,850",
                color: "#FACC15",
            },
        ]
    }
];

// Flatten for rendering
const allProjects = projectGroups.flatMap(g => g.items);

const Scene3_IndiaMap: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapWrapperRef = useRef<HTMLDivElement>(null); // The "World" that moves
    const svgRef = useRef<SVGSVGElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!mapWrapperRef.current) return;

            // Initial State: Zoomed in (scale 1.5) and focused on TOP (shift Y down)
            // Note: If scale is 1.5, element is bigger.
            // Positive Y moves the element DOWN, revealing the TOP part to the viewport.
            gsap.set(mapWrapperRef.current, {
                scale: 1.5,
                yPercent: 25, // Start pushed down ~25% to show top
                transformOrigin: "center center"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=4000", // Increased duration for smoother panning
                    pin: true,
                    scrub: 1,
                },
            });

            // --- SEQUENCE ---

            // PHASE 1: REVEAL TOP GROUP (Wrapper is at yPercent: 25)
            projectGroups[0].items.forEach(proj => {
                tl.fromTo(`#path-${proj.id}`,
                    { strokeDashoffset: 2000 },
                    { strokeDashoffset: 0, duration: 1, ease: "power1.inOut" }
                );
                tl.fromTo(`#img-${proj.id}`,
                    { autoAlpha: 0, scale: 0.5 },
                    { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                    "<+=0.2"
                );
            });

            // PHASE 2: PAN TO CENTER + REVEAL MIDDLE GROUP
            // Animate yPercent to 0 (Center)
            tl.to(mapWrapperRef.current, {
                yPercent: 0,
                duration: 2, // Take some time to pan
                ease: "power1.inOut"
            }, "+=0.5");

            // Reveal Center Items (during or slightly after pan)
            projectGroups[1].items.forEach(proj => {
                tl.fromTo(`#path-${proj.id}`,
                    { strokeDashoffset: 2000 },
                    { strokeDashoffset: 0, duration: 1, ease: "power1.inOut" },
                    "-=1.5" // Start while panning
                );
                tl.fromTo(`#img-${proj.id}`,
                    { autoAlpha: 0, scale: 0.5 },
                    { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                    "<+=0.2"
                );
            });

            // PHASE 3: PAN TO BOTTOM + REVEAL BOTTOM GROUP
            // Animate yPercent to -25 (Shift Up to show Bottom)
            tl.to(mapWrapperRef.current, {
                yPercent: -25,
                duration: 2,
                ease: "power1.inOut"
            }, "+=0.5");

            projectGroups[2].items.forEach(proj => {
                tl.fromTo(`#path-${proj.id}`,
                    { strokeDashoffset: 2000 },
                    { strokeDashoffset: 0, duration: 1, ease: "power1.inOut" },
                    "-=1.5"
                );
                tl.fromTo(`#img-${proj.id}`,
                    { autoAlpha: 0, scale: 0.5 },
                    { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                    "<+=0.2"
                );
            });


        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-slate-900 flex items-center justify-center"
        >
            {/* Fixed Background Image (Does not move with Map Pan) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/scene3/scene3-bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
            </div>

            {/* Title Overlay (Fixed) */}
            <div className="absolute top-24 left-4 md:left-12 lg:left-24 z-40 pointer-events-none">
                <div className="pl-6 border-l-[8px] border-blue-500">
                    <h2 className="text-4xl md:text-5xl font-bebas font-bold italic text-white tracking-wide shadow-sm uppercase">
                        TAIKISHA INDIA FOOTPRINT
                    </h2>
                </div>
            </div>

            {/* --- MOVABLE MAP CONTAINER (The "Camera") --- */}
            {/* This wrapper scales up and moves up/down. */}
            {/* We base size on viewport or fixed px? Let's use a large fixed box that we scale. */}
            {/* Using a square aspect ratio container helps unify the coordinate system. */}
            <div
                ref={mapWrapperRef}
                className="relative z-10 w-[100vh] h-[100vh] max-w-[1000px] max-h-[1000px] flex items-center justify-center origin-center will-change-transform"
            >
                {/* 1. The Map Image (Base) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/images/scene3/map-base.png"
                        alt="India Map"
                        width={800} // Increased base resolution
                        height={800}
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>

                {/* 2. SVG Overlay (Connectors) */}
                {/* Matches the wrapper size exactly so 50% is always center of map */}
                <svg
                    ref={svgRef}
                    className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                    viewBox="0 0 1920 1080" // Keeping 1920x1080 logic for paths, but mapped to square container? 
                    // Wait, if paths were designed for 1920x1080, and container is square, it might squash.
                    // Ideally, preserveAspectRatio="xMidYMid meet" handles it inside the square box.
                    preserveAspectRatio="xMidYMid meet"
                >
                    {allProjects.map((proj) => (
                        <path
                            key={proj.id}
                            id={`path-${proj.id}`}
                            d={proj.path}
                            fill="none"
                            stroke={proj.color}
                            strokeWidth="3"
                            strokeDasharray="2000"
                            strokeDashoffset="2000"
                            strokeLinecap="round"
                            className="opacity-80"
                        />
                    ))}
                </svg>

                {/* 3. Building Images (Markers) */}
                {/* These are absolute positioned inside the wrapper, so they move WITH the map automatically. */}
                {allProjects.map((proj) => (
                    <div
                        key={proj.id}
                        id={`img-${proj.id}`}
                        className="absolute z-30 w-48 h-32 md:w-64 md:h-40 bg-black/50 border border-yellow-500/30 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm opacity-0"
                        style={proj.style}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={proj.img}
                                alt={proj.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 w-full bg-black/70 text-yellow-400 text-xs font-bold p-1 text-center">
                            {proj.name}
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Scene3_IndiaMap;
