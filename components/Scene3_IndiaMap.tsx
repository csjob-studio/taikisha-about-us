"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Configuration ---
// Define building positions, images, and connector paths.
// Coordinates are relative % or px from center/specific points.
// SVG paths are designed to start from roughly the center (India map) and curve to the image location.
// NOTE: These paths are approximate and "artistic" representations for the demo.
const projects = [
    {
        id: "p1",
        name: "Project 1",
        img: "/images/scene3/project-1.png",
        // Position of the image container (percent from left/top)
        style: { top: "15%", left: "15%" },
        // The SVG path 'd' attribute. 
        // Assuming 1920x1080 viewBox for simplicity in responsive scaling or percentage based.
        // Starting near center (50% 50% => 960 540) to top-left.
        path: "M960,540 C850,500 600,300 350,250",
        color: "#FACC15", // Tailwind yellow-400
    },
    {
        id: "p2",
        name: "Project 2",
        img: "/images/scene3/project-2.png",
        style: { top: "20%", right: "15%" },
        path: "M960,540 C1050,500 1400,350 1600,300",
        color: "#FACC15",
    },
    {
        id: "p3",
        name: "Project 3",
        img: "/images/scene3/project-3.png",
        style: { bottom: "25%", left: "10%" },
        path: "M960,540 C800,600 500,800 250,850",
        color: "#FACC15",
    },
    {
        id: "p4",
        name: "Project 4",
        img: "/images/scene3/project-4.png",
        style: { bottom: "20%", right: "10%" },
        path: "M960,540 C1100,650 1500,800 1700,850",
        color: "#FACC15",
    },
    {
        id: "p5",
        name: "Project 5",
        img: "/images/scene3/project-5.png",
        style: { top: "50%", left: "5%" },
        path: "M960,540 C700,540 400,500 150,540",
        color: "#FACC15",
    },
    {
        id: "p6",
        name: "Project 6",
        img: "/images/scene3/project-6.png",
        style: { top: "50%", right: "5%" },
        path: "M960,540 C1200,540 1600,500 1770,540",
        color: "#FACC15",
    },
];

const Scene3_IndiaMap: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!svgRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=3000", // Long duration scroll
                    pin: true,
                    scrub: 1,
                    // markers: true, // Uncomment for debugging
                },
            });

            // For each project, add animations to the timeline sequentially
            projects.forEach((proj) => {
                // 1. Draw the path
                // We use fromTo on strokeDashoffset to animate the drawing action.
                // The strokeDasharray is set in the JSX to a high enough value (e.g., 2000).
                tl.fromTo(
                    `#path-${proj.id}`,
                    { strokeDashoffset: 2000 },
                    { strokeDashoffset: 0, duration: 1, ease: "power1.inOut" }
                );

                // 2. Reveal the image
                // Overlap slightly with path completion (use "<+=0.5" or similar if simultaneous is desired, 
                // but requirements say "after its path finishes").
                tl.fromTo(
                    `#img-${proj.id}`,
                    { autoAlpha: 0, scale: 0.5 },
                    { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
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
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {/* Using Next.js Image for optimization, or simple img if preferred for absolute background */}
                <Image
                    src="/images/scene3/scene3-bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
            </div>

            {/* Central India Map Base */}
            <div className="relative z-10 w-[60vh] h-[60vh] max-w-[600px] max-h-[600px] flex items-center justify-center">
                <Image
                    src="/images/scene3/map-base.png"
                    alt="India Map"
                    width={600}
                    height={600}
                    className="object-contain drop-shadow-2xl"
                    priority
                />
            </div>

            {/* SVG Overlay for Connectors */}
            <svg
                ref={svgRef}
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                viewBox="0 0 1920 1080" // Fixed viewBox for consistent coordinate system
                preserveAspectRatio="xMidYMid slice"
            >
                {projects.map((proj) => (
                    <path
                        key={proj.id}
                        id={`path-${proj.id}`}
                        d={proj.path}
                        fill="none"
                        stroke={proj.color}
                        strokeWidth="3"
                        strokeDasharray="2000" // Enough to cover the length of the path
                        strokeDashoffset="2000" // Start hidden
                        strokeLinecap="round"
                        className="opacity-80"
                    />
                ))}
            </svg>

            {/* Building Images */}
            {projects.map((proj) => (
                <div
                    key={proj.id}
                    id={`img-${proj.id}`}
                    className="absolute z-30 w-48 h-32 md:w-64 md:h-40 bg-black/50 border border-yellow-500/30 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm opacity-0" // Start invisible
                    style={proj.style as React.CSSProperties}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={proj.img}
                            alt={proj.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Optional Label */}
                    <div className="absolute bottom-0 w-full bg-black/70 text-yellow-400 text-xs font-bold p-1 text-center">
                        {proj.name}
                    </div>
                </div>
            ))}

            {/* Title Overlay (Optional - to match design aesthetic) */}
            <div className="absolute top-10 left-0 w-full text-center z-40 pointer-events-none">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-widest uppercase opacity-80">Our Footprint</h2>
            </div>

        </section>
    );
};

export default Scene3_IndiaMap;
