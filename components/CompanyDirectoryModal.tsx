'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useLenis } from '@studio-freight/react-lenis';

import { companyLocations } from '../data/companyData';
const companies = companyLocations;

interface CompanyDirectoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CompanyDirectoryModal({ isOpen, onClose }: CompanyDirectoryModalProps) {
    const [mounted, setMounted] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Stop background scroll (Lenis) and body scroll
            lenis?.stop();
            document.body.style.overflow = 'hidden';

            gsap.fromTo("#modal-content",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
            );
        } else {
            // Resume background scroll
            lenis?.start();
            document.body.style.overflow = '';
        }

        return () => {
            lenis?.start(); // Ensure scrolling resumes on unmount
            document.body.style.overflow = '';
        };
    }, [isOpen, lenis]);

    if (!mounted || !isOpen) return null;

    // Portal to body to ensure it sits on top of EVERYTHING
    return createPortal(
        // <div
        //     className="fixed inset-0 z-[9999] flex justify-center bg-black/80 backdrop-blur-md overflow-y-auto"
        //     data-lenis-prevent // explicitly tell Lenis to ignore this container
        // >
        <div
            className="fixed inset-x-0 top-[80px] bottom-0 z-40
             flex justify-center
             bg-black/80 backdrop-blur-md overflow-y-auto"
            data-lenis-prevent
        >


            {/* Modal Container Wrapper for centered alignment with scroll */}
            {/* <div className="relative w-full min-h-full flex items-center justify-center p-4 md:p-8"> */}
            <div className="relative w-full min-h-full flex justify-center p-4 md:p-8">

                {/* Content Card */}
                <div id="modal-content" className="relative w-full max-w-5xl bg-slate-900 text-white rounded-xl shadow-2xl border border-white/10 flex flex-col my-auto">

                    {/* Close Button - Sticky inside card */}
                    <div className="absolute top-4 right-4 z-50">
                        <button
                            onClick={onClose}
                            className="bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300 shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Content - Scrollable area inside card implies the card grows with content, but we are in a scrollable wrapper now */}
                    <div className="p-6 md:p-12">
                        <div className="space-y-10">
                            <h2 className="text-4xl font-bold border-l-8 border-blue-600 pl-4 uppercase font-bebas tracking-wide">
                                Taikisha Around the World
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {companies.map((company, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 border border-white/10 rounded-lg p-5 shadow-md backdrop-blur-sm"
                                    >
                                        <h3 className="text-lg font-semibold text-yellow-400 mb-1 leading-tight">
                                            {company.Office}
                                        </h3>
                                        <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-2">
                                            {company.company}
                                        </p>
                                        <p className="text-xs text-white/60 mb-3 bg-white/10 inline-block px-2 py-0.5 rounded">
                                            {company.city}, {company.country}
                                        </p>
                                        <p className="text-sm text-blue-50 whitespace-pre-line leading-relaxed">
                                            <span className="font-semibold text-blue-400">Address:</span> {company.address}
                                        </p>
                                        {(company.phone || company.fax) && (
                                            <p className="text-sm text-blue-100 mt-2 pt-2 border-t border-white/10">
                                                {company.phone && <span className="mr-3"><span className="font-semibold text-blue-400">Tel:</span> {company.phone}</span>}
                                                {company.fax && <span><span className="font-semibold text-blue-400">Fax:</span> {company.fax}</span>}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
}
