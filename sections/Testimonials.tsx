"use client";

import Image from "next/image";
import GlowCard from "@/components/GlowCard";
import TitleHeader from "@/components/TitleHeader";
import { testimonials } from "@/constants";

export default function Testimonials() {
    return (
        <section id="testimonials" className="flex-center section-padding overflow-hidden">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="What People Say About Me?"
                    sub="⭐️ Client feedback highlights"
                />
                <div className="lg:columns-3 md:columns-2 columns-1 mt-16 z-0">
                    {testimonials.map(({ imgPath, name, url, review }, index) => (
                        <GlowCard card={{ review }} key={name} index={index}>
                            <a 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 relative pointer-events-auto"
                            >
                                <div className="rounded-full overflow-hidden w-16 h-16">
                                    <Image 
                                        src={imgPath} 
                                        alt={name} 
                                        width={64} 
                                        height={64} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <div>
                                    <p className="font-bold">{name}</p>
                                </div>
                            </a>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
}