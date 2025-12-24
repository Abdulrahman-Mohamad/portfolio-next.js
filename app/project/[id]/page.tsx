"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect, useState } from 'react';

import { myProjects } from '@/constants';

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectDetails() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState({ show: false, type: '', text: '', link: '' });
  const [copied, setCopied] = useState(false);

  // Find the project by id
  const project = myProjects.find(p => p.id === parseInt(id));

  // Redirect if project not found
  useEffect(() => {
    if (!project && id) {
      router.push('/');
    }
  }, [project, id, router]);

  // GSAP animations
  useGSAP(() => {
    if (!project) return;
    const tl = gsap.timeline();

    // Hero section animation
    tl.fromTo('.hero-image', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' })
      .fromTo('.hero-content', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');

    // Stagger animation for description cards
    gsap.fromTo('.detail-card', { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.details-section', start: 'top 80%' } });

    // Tech stack animation
    gsap.fromTo('.tech-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.tech-section', start: 'top 80%' } });
  }, { scope: containerRef, dependencies: [project] });

  useGSAP(() => {
    if (showModal || downloadModal.show) {
      gsap.fromTo('.popup', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo('.popup > div', { y: 50, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.1 });
    }
  }, { dependencies: [showModal, downloadModal.show] });


  if (!project) {
    return null;
  }

  const handleGitHubClick = (e: React.MouseEvent) => {
    if (!project.github) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const handleDownloadClick = (type: 'android' | 'ios') => {
    const text = type === 'android' ? project.androidText : project.iosText;
    const link = type === 'android' ? project.android : project.ios;
    setDownloadModal({ show: true, type, text: text || '', link: link || '' });
  };

  const handleCopy = () => {
    if (downloadModal.link) {
      navigator.clipboard.writeText(downloadModal.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen section-padding">
      {/* Confidentiality Modal */}
      {showModal && (
        <div className="popup fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group cursor-pointer text-white">
              X
            </button>

            {/* Modal content */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <Image src="/images/github.png" alt="GitHub" width={40} height={40} className="w-10 h-10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Client Confidentiality
              </h2>
              <p className="text-white-50 text-lg leading-relaxed mb-8">
                For client confidentiality, I'm not able to share the source code for this project publicly. If you would like to review how the project was built, I'd be happy to show you a private walkthrough in an online meeting. Please feel free to contact me to schedule a short session.
              </p>
              <Link href="/contact" onClick={() => setShowModal(false)} className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transform hover:scale-105">
                <span>Contact Me</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {downloadModal.show && (
        <div className="popup fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setDownloadModal({ ...downloadModal, show: false })}>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDownloadModal({ ...downloadModal, show: false })} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group cursor-pointer text-white">
              X
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <Image src={`/images/${downloadModal.type}.png`} alt={downloadModal.type} width={40} height={40} className="w-10 h-10 object-contain" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 capitalize">
                {downloadModal.type} Version
              </h2>
              <p className="text-white-50 text-lg leading-relaxed mb-8">
                {downloadModal.text}
              </p>

              <div className="w-full bg-black/30 rounded-xl p-4 flex items-center gap-4 border border-white/10 mb-8">
                <p className="text-white/60 text-sm truncate flex-1 text-left">
                  {downloadModal.link}
                </p>
                <button
                  onClick={handleCopy}
                  className="shrink-0 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all duration-300 border border-white/10"
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>

              <a href={downloadModal.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transform hover:scale-105">
                <span>Download Now</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <Link href="/#work" className="inline-flex items-center gap-2 px-6 py-3 mb-10 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 group">
        <span>Back to Projects</span>
      </Link>

      {/* Hero Section */}
      <div className="hero-section mb-16">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Project Image */}
          <div className="hero-image relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
            <Image
              src={project.spotlight}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="hero-content relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-linear-to-r from-white to-blue-300 bg-clip-text">
              {project.title}
            </h1>
            <p className="text-white-50 text-lg md:text-xl mb-8 leading-relaxed">
              {project.desc}
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map((tag) => (
                <div key={tag.id} className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all duration-300">
                  <Image src={tag.path} alt={tag.name} width={24} height={24} className="w-6 h-6 object-contain" />
                  <span className="text-white-50 text-sm font-medium">{tag.name}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.href && (
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transform hover:scale-105">
                  <span>Visit Live Site</span>
                </a>
              )}

              {project.android && project.androidText && (
                <button onClick={() => handleDownloadClick('android')} className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/30 transform hover:scale-105 cursor-pointer">
                  <Image src="/images/android.png" alt="Android" width={20} height={20} className="w-5 h-5 object-contain" />
                  <span>Android</span>
                </button>
              )}

              {project.ios && project.iosText && (
                <button onClick={() => handleDownloadClick('ios')} className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/30 transform hover:scale-105 cursor-pointer">
                  <Image src="/images/ios.png" alt="iOS" width={20} height={20} className="w-5 h-5 object-contain" />
                  <span>iOS</span>
                </button>
              )}

              <a href={project.github || "#"} target="_blank" rel="noopener noreferrer" onClick={handleGitHubClick} className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/30 transform hover:scale-105 cursor-pointer">
                <Image src="/images/github.png" alt="GitHub" width={20} height={20} className="w-5 h-5" />
                <span>GitHub</span>
              </a>

              {project.figmaurl && (
                <a href={project.figmaurl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/30 transform hover:scale-105">
                  <Image src="/images/figma.png" alt="Figma" width={20} height={20} className="w-5 h-5" />
                  <span>Figma</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description Section */}
      {project.subdesc && project.subdesc.length > 0 && (
        <div className="details-section mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Project Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.subdesc.map((desc, index) => (
              <div key={index} className="detail-card bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Number Badge */}
                <div className="relative z-10 flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-white-50 leading-relaxed flex-1">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technologies Used Section */}
      <div className="tech-section">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Technologies Used
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.tags.map((tag) => (
            <div key={tag.id} className="tech-badge bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src={tag.path}
                  alt={tag.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-white text-center font-medium">
                {tag.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 flex flex-wrap gap-4 justify-center items-center">
        {project.href && (
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-xl transition-all duration-300 hover:bg-white/90 transform hover:scale-105">
            <span>Visit Live Site</span>
          </a>
        )}

        {project.android && project.androidText && (
          <button onClick={() => handleDownloadClick('android')} className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/30 transform hover:scale-105 cursor-pointer">
            <Image src="/images/android.png" alt="Android" width={20} height={20} className="w-5 h-5 object-contain" />
            <span>Android</span>
          </button>
        )}

        {project.ios && project.iosText && (
          <button onClick={() => handleDownloadClick('ios')} className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/30 transform hover:scale-105 cursor-pointer">
            <Image src="/images/ios.png" alt="iOS" width={20} height={20} className="w-5 h-5 object-contain" />
            <span>iOS</span>
          </button>
        )}

        <a href={project.github || "#"} target="_blank" rel="noopener noreferrer" onClick={handleGitHubClick} className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/30 transform hover:scale-105 cursor-pointer">
          <Image src="/images/github.png" alt="GitHub" width={20} height={20} className="w-5 h-5" />
          <span>GitHub</span>
        </a>

        {project.figmaurl && (
          <a href={project.figmaurl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/30 transform hover:scale-105">
            <Image src="/images/figma.png" alt="Figma" width={20} height={20} className="w-5 h-5" />
            <span>Figma</span>
          </a>
        )}

        <Link href="/#work" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10">View More Projects</Link>
      </div>
    </div>
  );
}
