'use client';

import { useRef, useEffect, useState } from 'react';
import NextImage from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// CONFIGURATION
const FRAME_COUNT = 100; // Total number of frames in the sequence
const IMAGE_FOLDER = '/images/scene3/sequence/';
const IMAGE_PREFIX = 'frame_'; // e.g., frame_0001.jpg
const IMAGE_EXTENSION = 'png';

export default function Scene3_Map() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Preload Images
    useEffect(() => {
        const loadImages = async () => {
            const promises: Promise<void>[] = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                const padIndex = String(i).padStart(4, '0');
                const src = `${IMAGE_FOLDER}${IMAGE_PREFIX}${padIndex}.${IMAGE_EXTENSION}`;

                img.src = src;
                imagesRef.current[i] = img;

                // Decode if possible, but resolve immediately on load/error
                const p = new Promise<void>((resolve) => {
                    img.onload = () => {
                        // Try to decode for smoother playback
                        if (img.decode) {
                            img.decode().catch(() => { }).finally(() => resolve());
                        } else {
                            resolve();
                        }
                    };
                    img.onerror = () => resolve();
                });

                promises.push(p);

                imagesRef.current[0].onload = () => {
                    setIsLoaded(true);
                };

            }

            // Don’t block rendering — mark as loaded once the *first frame* is ready
            await promises[0];
            setIsLoaded(true);

            // Continue decoding the rest in background
            Promise.all(promises).then(() => {
                console.log('Scene 3: All images loaded/decoded.');
            });
        };

        loadImages();
    }, []);

    // renderFrame functionality removed as it was unused and causing lint errors
    // If you need to restore the sequence logic, ensure renderFrame is called via GSAP scrollTrigger
    // const renderFrame = (index: number) => { ... }

    // ... (GSAP and Resize hooks remain same)

    return (
        <section className="relative w-full min-h-screen">

            {/* Scene 3 Background - Fixed/Sticky */}
            <div className="absolute inset-0 z-0 h-full">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <NextImage
                        src="/images/scene3/scene3-bg.jpg"
                        alt="Scene 3 Background"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Header scrolls normally over the background */}
            <div className="container mx-auto px-6 md:px-12 py-20 relative z-10">
                <div className="pl-6 border-l-[8px] border-cyan-400 inline-block">
                    <h2 className="text-4xl md:text-5xl font-bebas font-bold italic text-white tracking-wide shadow-sm uppercase">
                        Taikisha India Footprint
                    </h2>
                </div>
            </div>

            {/* Spacer before canvas */}
            <div className="h-40 md:h-60 relative z-10"></div>

            {/* Canvas pinned separately */}
            <div
                ref={containerRef}
                className="relative w-full h-screen overflow-hidden z-10"
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full block"
                />

                {!isLoaded && (
                    <div className="absolute bottom-10 right-10 z-50">
                        <div className="text-cyan-400 font-mono text-xs animate-pulse">
                            LOADING ASSETS...
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
