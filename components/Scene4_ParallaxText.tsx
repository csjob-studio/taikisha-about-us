'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene4_ParallaxText() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Effect: Move text slightly faster than scroll for depth
            gsap.to(contentRef.current, {
                y: -100, // Moves up relative to natural scroll
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full pt-20 min-h-[150vh] bg-slate-900 font-outfit">

            {/* Sticky Background Layer */}
            <div className="absolute inset-0 z-0">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <Image
                        src="/images/scene4/scene4-bg.jpg"
                        alt="Background Scene 4"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Scrolling Content Layer - Spacing Matches Scene 2 (pt-10) */}
            <div className="relative z-10 w-full flex flex-col items-center pt-10 pb-40">
                <div className="container mx-auto px-6 md:px-12">

                    {/* Header - Matches Scene 2 (mb-16, Left Aligned via container) */}
                    <div className="pl-6 border-l-[8px] border-blue-600 mb-16">
                        <h2 className="text-4xl md:text-5xl font-bebas font-bold italic text-white tracking-wide shadow-sm uppercase">
                            MESSAGE FROM PRESIDENT
                        </h2>
                    </div>

                    {/* Text Content */}
                    <div ref={contentRef} className="text-white max-w-6xl mx-auto px-4 md:px-0">
                        <div className="space-y-8 text-lg md:text-xl font-light italic text-slate-100 leading-relaxed tracking-wide drop-shadow-lg text-justify">
                            <p>
                                Guided by our Mission Statement, &quot;Customers First,&quot; we are committed to our Corporate Philosophy:
                                &quot;Establish a company which can continuously grow and contribute to society&quot; and
                                &quot;Establish an attractive company.&quot; With our core strength in environmental technologies related
                                to energy, air, and water, we are actively expanding our business on a global scale.
                            </p>

                            <p>
                                This fiscal year, alongside our three-year medium-term management plan, we have formulated our
                                first-ever Long-term Management Plan (10-year plan) to achieve significant growth over a longer
                                term, recognizing that our company has long contributed to social sustainability through our
                                business activities. In this plan, we express our vision for 2035 as &quot;Be Engineering,&quot; aiming to
                                become a &quot;Global Engineering Company Supporting Sustainable Industrial Innovation.&quot;
                            </p>

                            <p>
                                As industries make a decisive shift toward decarbonization, we anticipate further advances in
                                energy conservation, renewable energy, and energy reduction. We will continue to actively pursue
                                our commitment to decarbonization through our core business lines: industrial HVAC, building HVAC,
                                and paint finishing systems. By responding swiftly and flexibly to the evolving needs of society,
                                and by further enhancing our technological capabilities and human resource development, we will
                                continue striving to address societal challenges.
                            </p>

                            <p>
                                We are fully committed to meeting the expectations of our customers, business partners,
                                shareholders, investors, and all other stakeholders. We sincerely appreciate your continued
                                understanding and support.
                            </p>

                            <p className="font-semibold text-xl md:text-2xl text-yellow-400 text-right">
                                &quot;Mr. Masashi Osada&quot;
                            </p>
                        </div>
                    </div>

                    {/* Second Header - Corporate Policy */}
                    <div className="pl-6 border-l-[8px] border-blue-600 mb-12 mt-32">
                        <h2 className="text-4xl md:text-5xl font-bebas font-bold italic text-white tracking-wide shadow-sm uppercase">
                            TAIKISHA CORPORATE POLICY
                        </h2>
                    </div>

                    {/* Policy Content - Split Layout */}
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 text-white w-full max-w-[90%] mx-auto">

                        {/* Left Side: Text (Fit Content, No Wrap) */}
                        <div className="w-auto shrink-0">
                            <ul className="space-y-6 text-lg md:text-xl font-bold tracking-widest text-slate-100 drop-shadow-md py-6 whitespace-nowrap">
                                {[
                                    "CUSTOMERS",
                                    "BUSINESS PARTNER",
                                    "EMPLOYEES & THEIR FAMILIES",
                                    "SHAREHOLDERS",
                                    "SUPERVISORY AUTHORITIES",
                                    "GLOBAL ENVIRONMENT",
                                    "COMMUNITIES / SOCIETY"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 group">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.9)] group-hover:scale-150 transition-transform duration-300"></span>
                                        <span className="group-hover:text-white transition-colors duration-300">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Right Side: Triangle Image (Fills remaining space) */}
                        <div className="flex-1 w-full relative h-[400px] md:h-[700px]">
                            <Image
                                src="/images/scene4/policy-triangle.svg"
                                alt="Taikisha Corporate Policy Triangle"
                                fill
                                className="object-contain object-center"
                            />
                        </div>
                    </div>

                    {/* Vision Section - Integrated */}
                    <div className="w-full max-w-[90%] mx-auto mt-20 space-y-10">

                        {/* Top Two Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* MANAGEMENT */}
                            <div className="relative bg-[#e0565b]/80 p-8 text-white shadow-lg rounded-sm">
                                <div className="absolute right-0 top-0 h-full w-1.5 bg-[#c73c41]" />
                                <h3 className="text-2xl font-bold font-bebas uppercase mb-4 tracking-wider">
                                    Management
                                </h3>
                                <p className="text-base leading-relaxed font-light opacity-95">
                                    Total satisfaction of customers by understanding their
                                    requirements, delivering with highest value addition possible
                                    & utmost cooperation establishing strong long standing
                                    relations with customers.
                                </p>
                            </div>

                            {/* BUSINESS */}
                            <div className="relative bg-[#58b7a1]/80 p-8 text-white shadow-lg rounded-sm">
                                <div className="absolute left-0 top-0 h-full w-1.5 bg-[#3f9d89]" />
                                <h3 className="text-2xl font-bold font-bebas uppercase mb-4 tracking-wider">
                                    Business
                                </h3>
                                <p className="text-base leading-relaxed font-light opacity-95">
                                    Design Engineering & manufacturing of high end
                                    products by adopting global standards & emerging
                                    industries to deliver high quality plants, machinery &
                                    products.
                                </p>
                            </div>

                        </div>

                        {/* Bottom Full Card */}
                        <div className="bg-[#e3bb2b]/80 p-8 md:p-10 shadow-lg rounded-sm">
                            <h3 className="text-2xl font-bold font-bebas uppercase mb-8 tracking-wider border-b border-[#fff]/10 pb-4">
                                Mid-Term and Long-Term Vision
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

                                {/* PAINT FINISHING SYSTEM */}
                                <div className="space-y-3">
                                    <h4 className="font-bold uppercase text-lg tracking-wide border-l-4 border-[#fff] pl-3">
                                        Paint Finishing System
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 opacity-90 leading-relaxed font-medium">
                                        <li>Establish a firm position at home and abroad</li>
                                        <li>Development with an awareness of global social issues</li>
                                        <li>Improve business operation systems and productivity</li>
                                    </ul>
                                </div>

                                {/* INNOVATIVE ENGINEERING */}
                                <div className="space-y-3">
                                    <h4 className="font-bold uppercase text-lg tracking-wide border-l-4 border-[#fff] pl-3">
                                        Innovative Engineering
                                    </h4>
                                    <p className="opacity-90 leading-relaxed font-medium">
                                        Contribute to a Sustainable Society through Innovative
                                        Engineering of Energy, Air and Water
                                    </p>
                                </div>

                                {/* DIVERSITY & INCLUSION */}
                                <div className="space-y-3">
                                    <h4 className="font-bold uppercase text-lg tracking-wide border-l-4 border-[#fff] pl-3">
                                        Diversity & Inclusion
                                    </h4>
                                    <p className="opacity-90 leading-relaxed font-medium">
                                        Become an Inclusive Global Company by Leveraging
                                        Diverse Human Resources and Knowledge
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
