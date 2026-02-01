'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingClouds from './FloatingClouds';
import Globe3D from './Globe3D';
import CompanyDirectoryModal from './CompanyDirectoryModal';

gsap.registerPlugin(ScrollTrigger);

export default function Scene5_Directory() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section ref={containerRef} className="relative w-full h-screen font-outfit bg-slate-900 overflow-hidden">

            {/* Background - Fixed Full Cover */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/scene5/scene5-bg.jpg"
                    alt="Scene 5 Directory Background"
                    fill
                    className="object-cover object-center"
                    priority
                />

                {/* Clouds */}
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <FloatingClouds />
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col container mx-auto px-6 md:px-12">

                {/* Header - Fixed Position at Top (via Flex) */}
                <div className="pt-32 shrink-0">
                    <div className="pl-6 border-l-[8px] border-blue-600">
                        <h2 className="text-4xl md:text-5xl font-bebas font-bold italic text-white tracking-wide shadow-sm uppercase">
                            DIRECTORY
                        </h2>
                    </div>
                </div>

                {/* Main Content - Split Layout */}
                <div className="flex-1 flex flex-col md:flex-row items-center w-full">
                    {/* Left Side: Text */}
                    <div className="w-full md:w-1/2 flex flex-col items-start space-y-10 pl-6 z-20"> {/* Added z-20 to ensure text is above any potential overlap */}

                        <h3 className="text-4xl md:text-5xl font-bold tracking-wide text-white leading-tight drop-shadow-lg">
                            TAIKISHA <br />
                            <span className="text-blue-400">AROUND THE WORLD</span>
                        </h3>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative px-8 py-4 bg-transparent border-2 border-white text-white font-bold tracking-widest uppercase overflow-hidden hover:text-blue-900 transition-colors duration-300"
                        >
                            <span className="absolute inset-0 w-full h-full bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                            <span className="relative z-10">Explore Locations</span>
                        </button>

                    </div>

                    {/* Right Side: 3D Interactive Globe */}
                    <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex items-center justify-center">
                        <Globe3D />
                    </div>
                </div>

            </div>
            {/* Modal */}
            <CompanyDirectoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
