"use client";

import AnimatedCounter from '@/components/AnimatedCounter'
import HeroExperience from '@/components/HeroModels/HeroExperience'
import { words } from '@/constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Hero() {
  useGSAP(() => {
    gsap.fromTo('.hero-text h1', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" })
  }, [])

  return (
    <section id='hero' className='relative overflow-hidden'>
      <div className='absolute z-10'>
        <img src="/images/bg.png" alt="background" loading="lazy" />
      </div>

      <div className='hero-layout'>
        {/* LEFT: HERO CONTENT */}
        <header className='flex flex-col justify-center md:w-full w-screen me-auto md:px-20 px-5'>
          <div className='flex flex-col gap-7'>
            <div className='hero-text'>
              <h1>Shaping
                <span className='slide'>
                  <span className='wrapper'>
                    {words.map((word, i) => (
                      <span key={i} className='flex items-center md:gap-3 gap-1 pb-2'>
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          loading='lazy'
                          className='xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50'
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>
            <p className='text-white-50 md:text-xl relative z-10 pointer-events-none text-wrap'>Hi, I&apos;m AbdulRahman, a Front-End developer based in Egypt <br className='hidden lg:block' />  with a passion for creating interactive web experiences.</p>

            <div className='flex gap-2 items-center'>
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="md:w-70  w-full cta-wrapper">
                <div className="cta-button group">
                  <div className="bg-circle" />
                  <p className="text me-5 md:me-0">See My Work</p>
                  <div className="arrow-wrapper">
                    <img src="/images/arrow-down.svg" loading="lazy" alt="arrow" />
                  </div>
                </div>
              </button >
              <a
                href="/files/cv.pdf"
                download
                className="md:w-70  w-full cta-wrapper">
                <div className="cta-button group">
                  <div className="bg-circle" />
                  <p className="text me-5 md:me-0">Download CV</p>
                  <div className="arrow-wrapper">
                    <img src="/images/download.png" loading="lazy" alt="arrow" />
                  </div>
                </div>
              </a >
            </div>
          </div>
        </header>
        {/* RIGHT: 3D MODEL */}
        <figure>
          <div className='hero-3d-layout'>
            <HeroExperience />
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
}
