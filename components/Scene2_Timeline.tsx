'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import FloatingClouds from './FloatingClouds';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Exact Years and Data
const timelineData = [
    { year: '1995', desc: 'Established Japan & India Joint Venture' },
    { year: '1996', desc: 'Maruti Suzuki Gurugram Paint Shop 3 by Global Bidding' },
    { year: '1997', desc: 'First Robot Painting in India for 3W Bajaj, Aurangabad' },
    { year: '1999', desc: 'Electrical CP Manesar Factory' },
    { year: '2002', desc: 'Escorts 1st Indian client Tractor Paint Shop' },
    { year: '2004', desc: 'First Rail Coach Painting plant ICF, Chennai' },
    { year: '2007', desc: 'Fabrication Factory Pune' },
    { year: '2011', desc: 'Biggest Comm. Veh-72 JPH P/S Tata UTK' },
    { year: '2011', desc: 'European Client Daimler Paint Shop' },
    { year: '2012', desc: 'Fabrication Factory Vadodara' },
    { year: '2014', desc: 'First EPC Contract for Railways DLW, Varanasi' },
    { year: '2018', desc: 'Conveyor Factory Pune' },
    { year: '2019', desc: 'IoT Division Gurugram' },
    { year: '2020', desc: 'Robot Pre-Assembly Manesar' },
    { year: '2021', desc: 'Nexcel Technical Center, Manesar' },
];

export default function Scene2_Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const maskPathRef = useRef<SVGPathElement>(null); // For Drawing Animation (Mask)
    const motionPathRef = useRef<SVGPathElement>(null); // For Arrow Guide & Length
    const arrowRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null); // Added contentRef

    // State for responsive layout
    const [itemsPerRow, setItemsPerRow] = useState(3);
    const rowHeight = 180;
    const [viewBoxWidth, setViewBoxWidth] = useState(1000);
    const marginX = itemsPerRow === 1 ? 50 : 100; // Less margin on mobile

    // Responsive Listener
    useLayoutEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerRow(1);
                setViewBoxWidth(400); // Narrower coordinate system for mobile
            } else {
                setItemsPerRow(3);
                setViewBoxWidth(1000);
            }
        };

        // Initial Check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Dynamic Path Generation Logic
    const generateZigZagPath = () => {
        let d = "";
        const totalRows = Math.ceil(timelineData.length / itemsPerRow);
        let currentY = 100;
        const extension = 80;

        for (let row = 0; row < totalRows; row++) {
            const isLtoR = row % 2 === 0;
            const startX = isLtoR ? marginX - extension : viewBoxWidth - marginX + extension;
            const endX = isLtoR ? viewBoxWidth - marginX : marginX;

            if (row === 0) {
                // Only use M for the first row
                d += `M ${startX} ${currentY}`;
            } else {
                // Continue from previous curve end
                d += ` L ${startX} ${currentY}`;
            }

            // Draw horizontal line to end
            d += ` L ${endX} ${currentY}`;

            if (row < totalRows - 1) {
                const nextY = currentY + rowHeight;
                const curveStartX = isLtoR ? endX + extension : endX - extension;
                const controlX = isLtoR ? viewBoxWidth + extension : -extension;

                d += ` L ${curveStartX} ${currentY}`;
                d += ` C ${controlX} ${currentY}, ${controlX} ${nextY}, ${curveStartX} ${nextY}`;

                currentY = nextY;
            } else {
                // Final horizontal extension
                d += ` L ${isLtoR ? endX + extension : endX - extension} ${currentY}`;
            }
        }

        return d;
    };

    const getNodePosition = (index: number) => {
        const row = Math.floor(index / itemsPerRow);
        const colInRow = index % itemsPerRow;
        const isLtoR = row % 2 === 0;
        const effectiveWidth = viewBoxWidth - (2 * marginX);
        const segmentWidth = effectiveWidth / (itemsPerRow - 1);
        let x = marginX + (colInRow * segmentWidth);
        if (!isLtoR) {
            x = (viewBoxWidth - marginX) - (colInRow * segmentWidth);
        }
        const y = 100 + (row * rowHeight);
        return { x, y };
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Master Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    start: 'top top',
                    end: '+=4000',
                    scrub: 1,
                }
            });

            // 1. Draw Line (Reveal Mask)
            // Use the VISIBLE path for length (safer physics)
            const length = motionPathRef.current?.getTotalLength() || 0;

            // Set initial state on the MASK path
            gsap.set(maskPathRef.current, { strokeDasharray: length, strokeDashoffset: length });

            tl.to(maskPathRef.current, {
                strokeDashoffset: 0,
                ease: 'none',
                duration: 10,
            }, 0);

            // 2. Move Arrow Head along the VISIBLE path (Correct Coordinates)
            tl.to(arrowRef.current, {
                motionPath: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    path: motionPathRef.current as any,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    align: motionPathRef.current as any,
                    autoRotate: true,
                    alignOrigin: [0.5, 0.5],
                },
                ease: 'none',
                duration: 10,
            }, 0);

            // 3. Parallax Effect
            tl.to(contentRef.current, {
                y: () => {
                    const contentHeight = contentRef.current?.offsetHeight || 0;
                    const viewportHeight = window.innerHeight;
                    const diff = contentHeight - viewportHeight;
                    return diff > 0 ? -(diff + 100) : -50;
                },
                ease: 'none',
                duration: 15,
            }, 0);

            // 4. Node Activations - Sync with Line Progress
            // We select all nodes and animate them as part of the main scrub/timeline
            const nodes = gsap.utils.toArray('.timeline-node');
            const totalNodes = nodes.length;
            const duration = 10; // Must match the path drawing duration above

            nodes.forEach((node: any, i) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                // Calculate precise timing based on index
                // Nodes are ordered 0..N in the DOM
                // The arrow travels the full path in 'duration'.

                // Adjusted Timing: Use (totalNodes - 1) to map the last node to exactly 100%
                // Added a small POSITIVE delay (+0.1s in timeline time) to ensure arrow hits the point first
                const percent = i / (totalNodes - 1);
                const startTime = (duration * percent) + 0.1;

                tl.fromTo(node,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.1, // Faster pop-in for snappier feel
                        ease: 'back.out(0)',
                    },
                    startTime // Insert at specific time
                );
            });

            // ...
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen pt-10 pb-30 font-outfit">
            {/* Scene 2 Background - Sticky Wrapper */}
            <div className="absolute inset-0 z-0">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <Image
                        src="/images/scene2-bg.jpg"
                        alt="Scene 2 Background"
                        fill
                        className="object-cover object-top grayscale brightness-[0.4]"
                    />
                    {/* Clouds inside fixed background so they stay with it */}
                    <div className="absolute inset-0 z-[1] pointer-events-none">
                        <FloatingClouds />
                    </div>
                </div>
            </div>

            <div ref={contentRef} className="container mx-auto px-6 md:px-12 relative z-10 pt-[3rem]">
                {/* Section Header - Left Aligned with One Color */}
                <div className="mb-16 pl-6 border-l-[8px] border-yellow-400">
                    <h2 className="text-4xl md:text-5xl font-bebas font-bold italic text-white tracking-wide shadow-sm uppercase">
                        Taikisha Journey In India
                    </h2>
                </div>

                <div
                    className="relative w-full max-w-[1000px] mx-auto transition-all duration-500"
                    style={{ height: itemsPerRow === 1 ? `${(timelineData.length * rowHeight) + 200}px` : '950px' }}
                >
                    <div className="absolute inset-0 w-full h-full z-0">
                        <svg ref={svgRef} viewBox={`0 0 ${viewBoxWidth} ${itemsPerRow === 1 ? (timelineData.length * rowHeight) + 200 : 950}`} className="w-full h-full overflow-visible">
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#ffffff" />
                                </marker>
                                {/* MASK DEFINITION */}
                                <mask id="drawingMask">
                                    <path
                                        ref={maskPathRef} // USED FOR ANIMATION
                                        d={generateZigZagPath()}
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </mask>
                            </defs>

                            {/* Background Trace (Faint Dotted) */}
                            <path
                                d={generateZigZagPath()}
                                fill="none"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeDasharray="6 6"
                                opacity="0.0"
                                markerEnd="url(#arrowhead)"
                            />

                            {/* VISIBLE PATH (The Dotted Line we see) */}
                            <path
                                ref={motionPathRef} // USED FOR MOTION GUIDE
                                d={generateZigZagPath()}
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="6 6"
                                mask="url(#drawingMask)"
                            />
                        </svg>
                    </div>

                    {/* Data Layer */}
                    {timelineData.map((item, i) => {
                        const { x, y } = getNodePosition(i);
                        const leftPercent = (x / viewBoxWidth) * 100;

                        return (
                            <div
                                key={i}
                                className="timeline-node absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10 w-6 h-6 md:w-8 md:h-8 opacity-0" // Added opacity-0 default
                                style={{ left: `${leftPercent}%`, top: `${y}px` }}
                            >
                                {/* Node Dot - Yellow Intersection */}
                                <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-400 border-[2px] border-white rounded-full shadow-[0_0_15px_rgba(251,191,36,0.6)] z-20 hover:scale-150 transition-transform duration-300 cursor-pointer" />

                                {/* Year - ALWAYS ABOVE */}
                                <div className="absolute -top-10 md:-top-12 w-32 px-2 text-center z-10">
                                    <span className="block text-xl md:text-2xl font-black text-white drop-shadow-md tracking-tight">{item.year}</span> {/* Smaller Font */}
                                </div>

                                {/* Description - ALWAYS BELOW */}
                                <div className="absolute top-6 md:top-8 w-40 px-2 text-center z-10">
                                    <span className="block text-[10px] md:text-xs font-bold italic text-white/80 uppercase tracking-wider">{item.desc}</span>
                                </div>
                            </div>
                        );
                    })}

                    {/* The Active "Leader" Arrow Head - Moves via GSAP MotionPath */}
                    <div ref={arrowRef} className="absolute z-20 w-8 h-8 pointer-events-none -ml-4 -mt-4">
                        {/* Custom Arrow SVG */}
                        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                </div>
            </div>
        </section >
    );
}
