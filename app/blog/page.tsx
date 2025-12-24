"use client";

import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Animate the icon
    tl.fromTo('.construction-icon',
      { opacity: 0, scale: 0.5, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
    )
      .fromTo('.construction-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.construction-text',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.construction-buttons',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

    // Continuous rotation animation for the icon
    gsap.to('.construction-icon', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    // Floating animation
    gsap.to('.construction-card', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex items-center justify-center section-padding pt-32">
      <div className="construction-card bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-16 max-w-3xl w-full relative overflow-hidden group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Construction Icon */}
          <div className="construction-icon w-32 h-32 mb-8 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/20">
            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="construction-title text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white via-blue-300 to-purple-300 bg-clip-text text-transparent">
            Under Construction
          </h1>

          {/* Description */}
          <p className="construction-text text-white-50 text-lg md:text-xl leading-relaxed mb-4 max-w-2xl">
            I'm currently working on something amazing for this section.
            Stay tuned for exciting content coming soon!
          </p>

          <p className="construction-text text-white-50 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            In the meantime, feel free to explore my work or get in touch.
          </p>

          {/* Buttons */}
          <div className="construction-buttons flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Back to Home</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/30 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact Me</span>
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="mt-12 w-full max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white-50 text-sm">Progress</span>
              <span className="text-white-50 text-sm">Coming Soon...</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-blue-600 to-purple-600 rounded-full animate-pulse" style={{ width: '35%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
