"use client";

import { useRef } from "react";
import Image from "next/image";

interface GlowCardProps {
  card: {
    review: string;
  };
  children: React.ReactNode;
  index: number;
}

export default function GlowCard({ card, children, index }: GlowCardProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    const cardEl = cardRefs.current[idx];
    if (!cardEl) return;

    // Get the mouse position relative to card
    const rect = cardEl.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // calculate the angle from the center of the card
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

    angle = (angle + 360) % 360;

    cardEl.style.setProperty('--start', (angle + 60).toString());
  };

  return (
    <div
      ref={(el) => { if (el) cardRefs.current[index] = el; }}
      onMouseMove={handleMouseMove(index)}
      className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column"
    >
      <div className="glow" />
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <Image
            key={i}
            src="/images/star.png"
            alt="star"
            width={20}
            height={20}
            className="size-5"
          />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-white-50 text-lg">{card.review}</p>
      </div>
      {children}
    </div>
  );
}