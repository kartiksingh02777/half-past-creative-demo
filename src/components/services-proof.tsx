"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contact, services } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ProjectStartLink() {
  return (
    <Link className="project-reveal-link group flex flex-col items-stretch gap-6 border-b border-base-content/30 pb-8 sm:flex-row sm:items-end sm:justify-between" href="/contact">
      <span className="project-reveal-title relative z-10 min-w-0 text-4xl font-semibold uppercase leading-[0.84] sm:text-7xl lg:text-8xl xl:text-[8.5rem]">
        <span className="project-reveal-line">
          <span className="project-reveal-copy">Let&apos;s make the</span>
          <span aria-hidden="true" className="project-reveal-copy project-reveal-copy-alt">Let&apos;s make the</span>
        </span>
        <span className="project-reveal-line">
          <span className="project-reveal-copy">next one <span className="editorial-font normal-case italic text-secondary">matter.</span></span>
          <span aria-hidden="true" className="project-reveal-copy project-reveal-copy-alt">next one <span className="editorial-font normal-case italic text-secondary">matter.</span></span>
        </span>
      </span>
      <span className="project-reveal-arrow mb-2 grid size-16 shrink-0 place-items-center self-end border border-secondary bg-secondary text-secondary-content sm:size-20" aria-hidden="true">
        <ArrowUpRight size={42} strokeWidth={1.3} />
      </span>
    </Link>
  );
}

export function ServicesProof() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px)", () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-service-row]");
      const indicator = root.current?.querySelector<HTMLElement>("[data-capability-indicator]");
      gsap.set(rows, { opacity: 0.28, x: 0 });
      if (indicator && rows[0]) {
        gsap.set(indicator, { height: () => rows[0].offsetHeight, opacity: 0, y: () => rows[0].offsetTop });
      }
      const timeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root.current, start: "top top+=80", end: "bottom bottom", scrub: 0.65, invalidateOnRefresh: true } });
      rows.forEach((row, index) => {
        if (index > 0) timeline.to(rows[index - 1], { opacity: 0.28, x: -18, duration: 0.18 });
        const position = index ? "<0.03" : 0;
        if (indicator) timeline.to(indicator, { height: () => row.offsetHeight, opacity: 1, y: () => row.offsetTop, duration: 0.28 }, position);
        timeline.to(row, { opacity: 1, x: 16, duration: 0.28 }, indicator ? "<" : position);
      });
      timeline.to("[data-proof-film]", { filter: "saturate(1)", duration: 1 }, 0);
    });
    return () => media.revert();
  }, { scope: root });

  return (
    <>
      <section ref={root} className="service-proof relative bg-[#b9c2cc] text-[#111419] lg:h-[270svh]" id="services" aria-labelledby="services-title">
        <div className="grid gap-10 px-5 py-24 sm:px-8 lg:sticky lg:top-20 lg:h-[calc(100svh-5rem)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-0 lg:overflow-hidden lg:px-0 lg:py-0">
          <div className="flex flex-col justify-between lg:border-r lg:border-black/20 lg:px-12 lg:py-8">
            <header className="border-b border-black/20 pb-5">
              <p className="mb-4 text-xs uppercase text-[#9a2e2e]">Capabilities</p>
              <h2 id="services-title" className="text-5xl font-semibold uppercase leading-[0.84] sm:text-7xl">Ideas shaped to <span className="editorial-font normal-case italic text-[#a33e34]">perform.</span></h2>
            </header>

            <div className="relative isolate my-8 border-t border-black/20 lg:my-4">
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-[-12px] top-0 z-0 rounded-[8px] border border-white/55 bg-[linear-gradient(180deg,rgba(235,241,247,.38),rgba(143,154,166,.16))] opacity-0 shadow-[inset_0_1px_1px_rgba(255,255,255,.78),inset_0_-2px_3px_rgba(72,82,94,.2),0_9px_20px_rgba(61,72,84,.2)]" data-capability-indicator />
              {services.map((service) => (
                <Link className="group relative z-10 grid grid-cols-[42px_1fr_22px] items-center border-b border-black/20 py-4 text-black transition-colors hover:text-[#9a2e2e] lg:py-3" data-service-row href="/services" key={service.number}>
                  <span className="text-xs">{service.number}</span>
                  <span className="text-xl font-medium uppercase sm:text-2xl lg:text-xl xl:text-2xl">{service.name}</span>
                  <ArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={17} />
                </Link>
              ))}
            </div>

            <p className="max-w-lg text-sm leading-6 text-black/55">Strategy, film, music, motion, and emerging production tools held together by one creative direction.</p>
          </div>

          <div className="relative min-h-[62svh] overflow-hidden bg-black lg:min-h-0">
            <video autoPlay className="absolute inset-0 h-full w-full object-contain saturate-[.82]" data-proof-film loop muted playsInline poster="/work/ebella.jpg" preload="metadata" src="/media/previews/ebella-proof-hd.mp4" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.12),transparent_38%,rgba(0,0,0,.72))]" />
            <div className="absolute inset-x-5 top-5 flex justify-between border-b border-white/25 pb-4 text-[10px] uppercase text-white/65 sm:inset-x-8 lg:inset-x-10">
              <span>Toyota Ebella / Launch experience</span><span>Proof in motion</span>
            </div>
            <div className="absolute inset-x-5 bottom-6 text-white sm:inset-x-8 lg:inset-x-10 lg:bottom-8">
              <p className="max-w-[10ch] text-4xl font-semibold uppercase leading-[0.88] [text-shadow:0_4px_28px_rgba(0,0,0,.9)] sm:text-7xl">The work carries the <span className="editorial-font normal-case italic text-[#82c9e0]">proof.</span></p>
              <p className="mt-5 max-w-md border-l-2 border-[#d65b4c] pl-4 text-sm leading-6 text-white/82">Original music and live performance built to give a vehicle reveal scale, rhythm, and momentum.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100 px-5 py-24 text-base-content sm:px-8 lg:px-12 lg:py-32" id="project-start">
        <div className="mx-auto max-w-[1800px]" data-reveal>
          <p className="mb-8 text-xs uppercase text-secondary">Start a project</p>
          <ProjectStartLink />
          <div className="mt-8 flex flex-col justify-between gap-3 text-sm text-base-content/55 sm:flex-row">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span>Vashi, Navi Mumbai / India</span>
          </div>
        </div>
      </section>
    </>
  );
}
