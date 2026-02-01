'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@studio-freight/react-lenis';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSnapper() {
    const lenis = useLenis();

    useLayoutEffect(() => {
        const sections = gsap.utils.toArray<HTMLElement>('.section-snap');

        // We need to wait for layout to be stable
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                snap: {
                    snapTo: (progress, self) => {
                        if (!self) return progress;
                        // Calculate total scrollable height
                        const totalScroll = self.end - self.start;
                        const currentPos = totalScroll * progress;

                        // Find the closest section top
                        // const startData = sections.map(s => s.offsetTop); // Unused
                        // Assumption: Sections are stacked. The "height" or "bottom" is the next section's top. 
                        // Or we can get offsetHeight. Let's use offsetHeight for accuracy.
                        const sectionData = sections.map(s => ({
                            top: s.offsetTop,
                            bottom: s.offsetTop + s.offsetHeight
                        }));

                        const viewportHeight = window.innerHeight;
                        // const currentPos = totalScroll * progress; // This is purely based on progress
                        // GSAP's scroll position might differ slightly from window.scrollY if using Lenis, 
                        // but self.scroll() is safer. 'progress' is normalized.
                        // Let's rely on progress * totalScroll.

                        // Check if we are "Safe" inside a section
                        // A section is "Safe" if its Top is above viewport and Bottom is below viewport
                        // with some buffer to allow reading the very edges without snapping away.

                        // Actually, user wants "Only one section". 
                        // So if the bottom of Section A is in the viewport (transition to B), 
                        // we MUST snap to B (or back to A).
                        // We cannot leave the seam visible.

                        // Revised Logic:
                        // Find the closest "Snap Target" (Top of a section).
                        let closest = 0;
                        let minDiff = Infinity;

                        sectionData.forEach(section => {
                            const diff = Math.abs(currentPos - section.top);
                            if (diff < minDiff) {
                                minDiff = diff;
                                closest = section.top;
                            }
                        });

                        // Now the crucial part:
                        // If the closest section is the one we are "inside" of, and it is a LONG section...
                        // We should only snap to its Top if we are actually near the Top.
                        // If we are deep inside it, and minDiff is large (e.g. > viewport), 
                        // that means "closest" is effectively "far away".

                        // Wait, if we are at 2500 of 5000px section.
                        // Closest Top is 0 (diff 2500).
                        // Next Top is 5000 (diff 2500).
                        // If I simply snap to closest, it yanks me.

                        // The User wants: "Only snap if new scene title comes in".
                        // This means: If I scroll down and Scene 3 Top (5000) enters height, SNAP to 5000.
                        // If I scroll up and Scene 1 Top (0) enters height... wait, Scene 1 ends at 1000.
                        // If I am at 500 (Scene 1), I am fine.

                        // Hybrid Logic:
                        // 1. Identify which section we are visually "viewing" (covering most screen).
                        // 2. If we are visually transitioning (two sections share screen):
                        //    - Snap to the one taking consistent space OR closest border. (Eliminate seam).
                        // 3. If we are fully inside one section:
                        //    - Return progress (No Snap).

                        let activeSectionIndex = -1;
                        for (let i = 0; i < sectionData.length; i++) {
                            const sec = sectionData[i];
                            // Check if this section Covers the viewport fully or mostly
                            if (currentPos >= sec.top - 5 && currentPos + viewportHeight <= sec.bottom + 5) {
                                // We are fully strictly inside this section.
                                activeSectionIndex = i;
                                break;
                            }
                        }

                        if (activeSectionIndex !== -1) {
                            // We are safely inside a section. DO NOT SNAP.
                            return progress;
                        }

                        // If we are NOT safely inside (meaning a seam is visible), we must snap.
                        // User Request: "If title is visible (next section), scroll to top".
                        // Use DIRECTION to decide which way to snap.

                        // Default to closest
                        let snapTarget = closest;

                        if (self.direction > 0) {
                            // Scrolling DOWN. Find the first section starting AFTER (or near) currentPos.
                            // We want to snap to the NEXT section if we are in the transition zone.
                            const nextSection = sectionData.find(s => s.top > currentPos + 5);
                            if (nextSection) snapTarget = nextSection.top;
                        } else if (self.direction < 0) {
                            // Scrolling UP. Find the section starting BEFORE currentPos.
                            // We want to snap to the PREVIOUS section (Top of current or previous).
                            // We look for the section whose Top is closest to currentPos but <= currentPos.
                            // Actually, if we are at 1200 (Top of B is 1000). We want transition to B (1000).
                            // If we are at 900 (Bottom of A). We want A (0).

                            // Find section with largest Top that is <= currentPos + buffer
                            const prevSection = [...sectionData].reverse().find(s => s.top < currentPos + viewportHeight / 2);
                            if (prevSection) snapTarget = prevSection.top;
                        }

                        return snapTarget / totalScroll;
                    },
                    duration: { min: 0.2, max: 0.8 }, // duration of the snap animation
                    delay: 0.2, // delay after scrolling stops before snapping starts
                    ease: "power2.inOut", // easing for the snap animation
                    inertia: false, // physics-based snapping
                }
            });
        });

        return () => ctx.revert();
    }, [lenis]); // Re-run if lenis instance changes (though unlikely)

    return null;
}
