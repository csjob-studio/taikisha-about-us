"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 25;
const currentFrame = (index: number) => 
    `/images/scene3/sequence/frame_${index + 1}.png`;

const Scene3_Map_Sequence: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapSectionRef = useRef<HTMLDivElement>(null); // To move the map up
    const bgRef = useRef<HTMLDivElement>(null); 
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    // 1. Preload Sequence Frames
    useLayoutEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            const img = new window.Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) setImages(loadedImages);
            };
            loadedImages.push(img);
        }
    }, []);

    // 2. Animation Logic
    useLayoutEffect(() => {
        if (images.length < frameCount || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = 1920;
        canvas.height = 1080;

        const sequenceObj = { frame: 0 };

        const render = () => {
            if (!context) return;
            const img = images[Math.round(sequenceObj.frame)];
            if (img) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        };

        render();

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=4000", 
                    pin: true,
                    scrub: 0.5,
                    onUpdate: render,
                }
            });

            // No Scale applied here to keep the Title stable
            gsap.set(mapSectionRef.current, { y: "5%" });
            gsap.set(bgRef.current, { y: 0 });

            // PHASE 1: Render frames 0 to 15 (Focus North)
            tl.to(sequenceObj, {
                frame: 15,
                ease: "none",
                duration: 2,
            });

            // PHASE 2: Parallax Shift (Focus South)
            // Title and Map Top move up together
            tl.to(mapSectionRef.current, {
                y: "-30%", 
                ease: "power2.inOut",
                duration: 1.5,
            }, "shift");

            // Background moves slower for depth
            tl.to(bgRef.current, {
                y: "-15%", 
                ease: "power2.inOut",
                duration: 1.5,
            }, "shift");

            // PHASE 3: Render frames 16 to 23 (Stable Bottom)
            tl.to(sequenceObj, {
                frame: frameCount - 1,
                ease: "none",
                duration: 1.5,
            });

        });

        return () => ctx.revert();
    }, [images]);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-slate-900 overflow-hidden font-outfit">
            
            {/* 1. Sticky Background Wrapper */}
            <div className="absolute inset-0 z-0 h-full pointer-events-none">
                <div ref={bgRef} className="relative h-[120%] w-full">
                    <Image
                        src="/images/scene3/scene3-bg.jpg"
                        alt="Scene 3 Background"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90"></div>
                </div>
            </div>

            {/* 2. Content Layer */}
            <div 
                ref={mapSectionRef}
                className="relative z-10 w-full h-full flex flex-col will-change-transform"
            >
                {/* Header - Styled like your Journey page */}
                <div className="container mx-auto px-6 md:px-12 pt-20">
                    <div className="mb-8 pl-6 border-l-[8px] border-blue-500">
                        <h2 className="text-4xl md:text-5xl font-bebas font-bold italic text-white tracking-wide shadow-sm uppercase">
                            Taikisha India Footprint
                        </h2>
                    </div>
                </div>

                {/* Map/Sequence Canvas */}
                <div className="flex-1 flex items-start justify-center px-6 pt-10 ">
                    <canvas
                        ref={canvasRef}
                        className="w-full max-w-[calc(64rem+4rem)] md:max-w-[calc(64rem+4rem)] h-auto object-contain drop-shadow-[0_0_50px_rgba(34,211,238,0.2)]"
                        style={{ maxHeight: '80vh' }}
                    />
                </div>
            </div>

            {/* Subtle glow behind the map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-cyan-500/5 blur-[120px] rounded-full z-[5] pointer-events-none"></div>
        </section>
    );
};

export default Scene3_Map_Sequence;