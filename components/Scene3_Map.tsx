'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS = [
  {
    id: 'gurugram',
    image: '/images/buildings/gurugram.png',
    x: '-38%',
    y: '-28%',
    pathId: 'path-gurugram',
  },
  {
    id: 'manesar',
    image: '/images/buildings/manesar.png',
    x: '36%',
    y: '-18%',
    pathId: 'path-manesar',
  },
  {
    id: 'pune',
    image: '/images/buildings/pune.png',
    x: '-40%',
    y: '30%',
    pathId: 'path-pune',
  },
];

export default function Scene3_Map() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>('svg .connector');
      const cards = gsap.utils.toArray<HTMLElement>('.building-card');

      // Prepare paths
      paths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 1,
        });
      });

      gsap.set(cards, { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3000',
          scrub: 1,
          pin: true,
        },
      });

      LOCATIONS.forEach((loc) => {
        const path = document.getElementById(loc.pathId);
        const card = document.getElementById(`card-${loc.id}`);

        if (!path || !card) return;

        tl.to(path, {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: 'none',
        });

        tl.to(
          card,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          '<0.15'
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-10 left-0 w-full z-50 flex justify-center">
        <div className="container mx-auto px-6">
          <div className="pl-6 border-l-[8px] border-yellow-400">
            <h2 className="text-4xl md:text-5xl font-bebas italic text-white uppercase">
              Taikisha India Footprint
            </h2>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Image
          src="/images/map-base.png"
          alt="India Map"
          width={600}
          height={700}
          priority
        />
      </div>

      {/* SVG CONNECTORS */}
      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
      >
        <path
          id="path-gurugram"
          className="connector"
          d="M520 350 L300 250"
          stroke="#facc15"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
        />

        <path
          id="path-manesar"
          className="connector"
          d="M540 360 L720 260"
          stroke="#facc15"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
        />

        <path
          id="path-pune"
          className="connector"
          d="M500 520 L300 720"
          stroke="#facc15"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
        />
      </svg>

      {/* BUILDINGS */}
      {LOCATIONS.map((loc) => (
        <div
          key={loc.id}
          id={`card-${loc.id}`}
          className="building-card absolute z-30"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(${loc.x}, ${loc.y})`,
          }}
        >
          <Image
            src={loc.image}
            alt=""
            width={280}
            height={180}
            className="rounded-xl shadow-2xl"
          />
        </div>
      ))}
    </section>
  );
}
