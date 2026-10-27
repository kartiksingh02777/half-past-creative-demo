"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProcessStage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px)", () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-process-step]");
        const lines = gsap.utils.toArray<HTMLElement>("[data-process-line]");
        gsap.set(steps.slice(1), { opacity: 0.24, scale: 0.86, transformOrigin: "left center" });
        gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top 80px", end: "bottom bottom", scrub: 0.65 },
        });

        process.forEach((_, index) => {
          timeline
            .to(lines[index], { scaleX: 1, duration: 0.42 })
            .to(steps[index], { opacity: 1, scale: 1, duration: 0.35 }, "<");
          if (index > 0) timeline.to(steps[index - 1], { opacity: 0.24, scale: 0.86, duration: 0.3 }, "<");
        });
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-[#f3f1ea] text-[#050505] lg:h-[390svh]" id="process" aria-labelledby="process-title">
      <div className="mx-auto max-w-[1800px] px-5 py-24 sm:px-8 lg:sticky lg:top-20 lg:flex lg:h-[calc(100svh-5rem)] lg:flex-col lg:overflow-hidden lg:px-12 lg:py-8">
        <header className="grid gap-10 border-b border-black/20 pb-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase text-black/45">How we move</p>
            <p className="text-xs uppercase text-black/45">Since 2003 / Vashi, Navi Mumbai / 22+ years</p>
          </div>
          <h2 id="process-title" className="text-5xl font-semibold uppercase leading-[0.84] sm:text-7xl lg:text-8xl">From thinking to motion.</h2>
        </header>

        <div className="mt-12 grid flex-1 gap-0 lg:grid-cols-4 lg:items-stretch">
          {process.map(([number, phase, title, body], index) => (
            <article className="relative border-b border-black/20 py-8 lg:flex lg:flex-col lg:justify-between lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0" data-process-step key={number}>
              <div>
                <div className="mb-10 flex items-center gap-4">
                  <span className="text-xs">{number}</span>
                  <span className="h-px flex-1 bg-black" data-process-line />
                </div>
                <p className="text-xs uppercase text-black/45">{phase}</p>
                <h3 className="mt-5 text-4xl font-semibold uppercase leading-[0.9] lg:text-5xl">{title}</h3>
              </div>
              <div className="mt-10">
                <div className="process-diagram mb-7 h-20 border-y border-black/20" aria-hidden="true">
                  <span className={`process-signal process-signal-${index + 1}`} />
                </div>
                <p className="leading-7 text-black/55">{body}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="border-t border-black/20 pt-5 text-right text-2xl font-semibold uppercase sm:text-3xl">Good work keeps getting better.</p>
      </div>
    </section>
  );
}
