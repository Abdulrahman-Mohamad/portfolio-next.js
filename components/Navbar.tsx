"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animation for sidebar
  useGSAP(() => {
    if (isMenuOpen && sidebarRef.current) {
      // Animate sidebar entrance
      gsap.fromTo(sidebarRef.current, { x: -400, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" });

      // Animate menu items with stagger
      gsap.fromTo(menuItemsRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" });
    }
  }, [isMenuOpen]);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return <>
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"} z-40`}>
      <div className="inner ">
        <Link href="/" className="logo flex items-center gap-4">
          <Image src="/favIcon.png" width={60} height={60} priority alt="Logo" className="w-15 h-auto" />
          AbdelRahman
        </Link>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <Link href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/contact" className="contact-btn group hidden lg:block">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </Link>

        <div className=" lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Image
              src={isMenuOpen ? "/images/x.svg" : "/images/menu.svg"}
              width={24}
              height={24}
              alt="Menu Toggle"
            />
          </button>
        </div>
      </div>
    </header>

    {/* NavLink in Mobile view */}
    {isMenuOpen &&
      <div
        ref={sidebarRef}
        className="fixed left-0 top-0 bottom-0 w-[300px] md:w-[400px] bg-black border-r-2 border-white-50 z-50 p-8"
      >
        <div className="flex flex-col h-full space-y-10">
          <div ref={(el) => { if (el) menuItemsRef.current[0] = el; }} className="text-white-50 text-xl font-semibold flex items-center gap-4">
            <Link href="/" className="flex items-center gap-4" onClick={handleCloseMenu}>
              <Image src="/favIcon.png" width={60} height={60} alt="Logo" className="w-15 h-auto" />
              AbdelRahman
            </Link>
          </div>

          <ul className="space-y-6">
            {navLinks.map(({ link, name }, index) => (
              <li key={name} ref={(el) => { if (el) menuItemsRef.current[index + 1] = el; }} className="group text-white-50 relative">
                <Link href={link} onClick={handleCloseMenu}>
                  <span className="text-lg md:text-xl">{name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div ref={(el) => { if (el) menuItemsRef.current[navLinks.length + 1] = el; }}>
            <Link href="/contact" className="flex group" onClick={handleCloseMenu}>
              <div className="px-5 py-2 rounded-lg bg-white text-black">
                <span>Contact me</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    }
  </>
}

export default NavBar;