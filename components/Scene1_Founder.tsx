'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingClouds from './FloatingClouds';

gsap.registerPlugin(ScrollTrigger);

export default function Scene1_Founder() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    // contentWrapperRef removed as unused
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Entrance Animation
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Image Fade In + Up
            tl.from(imageWrapperRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
            });

            // Cards Staggered Entrance
            tl.from([card1Ref.current, card2Ref.current], {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
            }, '-=0.6');

            // 2. Parallax & Scroll Transition
            // Image Parallax (slower than scroll)
            gsap.to(imageWrapperRef.current, {
                y: 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Transition to Scene 2 (Exit Effect) - REMOVED to prevent white gap
            // Leaving only the parallax effects above.

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden flex pt-32 pb-20 lg:py-0 font-outfit">

            {/* Background Image - Fixed Position */}
            <div ref={bgRef} className="absolute inset-0 z-[-10]">
                <Image
                    src="/images/scene1-bg.jpg"
                    alt="Scene 1 Background"
                    fill
                    className="object-cover object-top" // Force alignment to top
                />
            </div>

            {/* Moving Clouds Layer (z-[-5]) */}
            <FloatingClouds />

            <div className="container mx-auto px-6 md:px-12 h-full flex flex-col relative z-10 pt-[10rem]">

                {/* Top Row: Founder Image + Founder Director Box */}
                <div className="flex flex-col lg:flex-row w-full items-start justify-between">

                    {/* Founder Image - Left Side with margin-left */}
                    <div ref={imageWrapperRef} className="relative w-[240px] aspect-[3/4] drop-shadow-2xl mb-12 lg:mb-0 self-center lg:self-start ml-12">
                        <Image
                            src="/images/founder.png"
                            alt="N.A. Makwana - Founder Director"
                            fill
                            className="object-contain object-top"
                            priority
                        />
                    </div>

                    {/* Founder Director Box - Right Side, placed at top with margin-top */}
                    <div
                        ref={card1Ref}
                        className="border-l-[6px] border-blue-600/60 lg:ml-10 mt-12"
                    >
                        <div className="bg-blue-600/60 p-6 ml-1 w-full max-w-[42rem] self-center lg:self-end">
                            <div className=" ml-6">
                                <h2 className="text-[24pt] font-roboto font-bold italic text-white leading-none tracking-wide">
                                    N.A. MAKWANA
                                </h2>
                                <p className="text-[18pt] font-roboto font-medium italic text-white uppercase tracking-[0.3em] mt-1">
                                    Founder Director
                                </p>
                            </div>
                            <blockquote className="text-[15pt] font-roboto font-light italic text-white leading-relaxed mt-4 border-t border-white/20 pt-4 text-justify [text-align-last:justify] w-full">
                                “Time is the greatest asset in human life and to be well planned and not wasted. Every man striving to achieve highest quality with ethical working can change not only the nation, but also the whole world.”
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Customers First Box with margin-left */}
                <div
                    ref={card2Ref}
                    className="border-l-[6px] border-emerald-600/60 lg:ml-10 mt-12 mb-12"
                >
                    <div className="bg-emerald-600/60 p-6 ml-1 w-full max-w-[55rem] self-start shadow-lg">
                        <div className="ml-6">
                            <h3 className="text-[24pt] font-roboto font-bold text-white tracking-wide border-b border-white/20 pb-2 mb-4">
                                CUSTOMERS FIRST
                            </h3>
                        </div>
                        <div className="space-y-1 leading-relaxed">
                            <p className="text-[15pt] font-roboto font-light text-white text-justify [text-align-last:justify]">
                                Customers are defined as Overall Society in a broad sense. The spirit of "Customers First" is to win
                                persistent trust from the customer. To achieve this goal, we have to follow our own conscience and
                                make the utmost efforts in every doing, based on the belief that the behaviour of individuals or the
                                company will bring benefit and happiness to one’s counterpart.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
