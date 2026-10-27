"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectDepthScene } from "@/components/project-depth-scene";

gsap.registerPlugin(ScrollTrigger);

const planeSources = Array.from({ length: 8 }, (_, index) => `/media/polychromos-tunnel/plane-${String(index + 1).padStart(2, "0")}.webp`);

const planeLayouts = [
  { left: "7%", top: "17%", width: "34%", z: -40, rotateY: 12, rotateZ: 2 },
  { left: "59%", top: "10%", width: "36%", z: -210, rotateY: -14, rotateZ: -2 },
  { left: "1%", top: "56%", width: "35%", z: -440, rotateY: 15, rotateZ: -1 },
  { left: "63%", top: "55%", width: "34%", z: -620, rotateY: -13, rotateZ: 2 },
  { left: "23%", top: "34%", width: "32%", z: -820, rotateY: 9, rotateZ: -2 },
  { left: "48%", top: "38%", width: "31%", z: -1020, rotateY: -9, rotateZ: 1 },
] as const;

export function PolychromosTunnel() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const planes = gsap.utils.toArray<HTMLElement>("[data-tunnel-plane]", section);
      gsap.set(planes, {
        z: (index) => planeLayouts[index].z,
        rotationY: (index) => planeLayouts[index].rotateY,
        rotationZ: (index) => planeLayouts[index].rotateZ,
        transformOrigin: "center center",
      });
      const tween = gsap.to(planes, {
        z: (index) => planeLayouts[index].z + 1180,
        yPercent: (index) => (index % 2 ? -24 : 18),
        rotationY: (index) => planeLayouts[index].rotateY * 0.2,
        rotationZ: 0,
        stagger: 0.035,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top+=80", end: "bottom bottom", scrub: 0.9 },
      });
      return () => tween.kill();
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    const section = root.current;
    const heading = title.current;
    if (!section || !heading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let played = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || played) return;
      played = true;
      gsap.fromTo(
        heading.querySelectorAll("[data-tunnel-word]"),
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, stagger: 0.11, duration: 1.1, ease: "expo.out" },
      );
    }, { threshold: 0.25 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={root} className="tunnel-section relative bg-base-100 text-base-content md:h-[360svh]" id="polychromos" aria-labelledby="tunnel-title">
      <div className="relative overflow-hidden px-5 py-24 sm:px-8 md:sticky md:top-20 md:h-[calc(100svh-5rem)] md:p-0">
        <ProjectDepthScene variant="material" />
        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block [perspective:1100px]" aria-hidden="true">
          <div className="absolute inset-0 [transform-style:preserve-3d]">
            {planeLayouts.map((plane, index) => (
              <figure
                className="absolute aspect-video overflow-hidden border border-white/20 bg-black/80 shadow-[0_26px_75px_rgba(0,0,0,.5)] [backface-visibility:hidden]"
                data-tunnel-plane
                key={planeSources[index]}
                style={{ left: plane.left, top: plane.top, width: plane.width }}
              >
                <Image alt="" className="object-cover opacity-90" fill loading="eager" sizes="36vw" src={planeSources[index]} />
              </figure>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(5,5,5,.72)_0%,transparent_48%,rgba(5,5,5,.34)_100%)] shadow-[inset_0_0_170px_rgba(5,5,5,.78)] md:block" />

        <div className="grid gap-4 md:hidden">
          {planeSources.slice(0, 4).map((source, index) => (
            <figure className={`relative aspect-[16/10] overflow-hidden border border-base-content/20 ${index % 2 ? "ml-8" : "mr-8"}`} key={source}>
              <Image alt="Polychromos film frame" className="object-cover" fill sizes="(max-width: 767px) calc(100vw - 4.5rem), 0px" src={source} />
            </figure>
          ))}
        </div>

        <div className="pointer-events-none relative z-20 mt-10 md:absolute md:inset-0 md:mt-0">
          <div className="md:absolute md:left-8 md:top-5 lg:left-12 lg:top-6">
            <p className="text-xs uppercase text-secondary [text-shadow:0_2px_12px_rgba(0,0,0,.95)]">Material study</p>
            <p className="mt-1.5 max-w-56 text-[10px] uppercase leading-4 text-base-content/70 [text-shadow:0_2px_12px_rgba(0,0,0,.95)]">Pigment becomes surface. Surface becomes feeling.</p>
          </div>

          <h2 ref={title} id="tunnel-title" className="mt-8 max-w-[8ch] text-5xl uppercase leading-[0.92] text-base-content [text-shadow:0_5px_34px_rgba(0,0,0,.95)] sm:text-6xl md:absolute md:left-8 md:top-[22%] md:mt-0 md:text-7xl lg:left-12 lg:top-[20%] lg:text-[5.5rem] xl:text-[6.2rem]">
            <span className="block [-webkit-text-stroke:1px_#f3f1ea] [color:transparent]" data-tunnel-word>Colour</span>
            <span className="editorial-font my-1.5 block normal-case italic text-secondary" data-tunnel-word>becomes</span>
            <span className="block" data-tunnel-word>emotion.</span>
          </h2>

          <div className="hidden md:absolute md:right-8 md:top-5 md:block lg:right-12 lg:top-6">
            <p className="text-right text-[10px] uppercase leading-4 text-base-content/65">Footage study / 01<br />Scroll-linked spatial edit</p>
          </div>

          {/* Slim, elegant bottom control bar fitted directly to content */}
          <div className="pointer-events-auto mt-8 flex items-center justify-between gap-4 border-t border-white/25 bg-black/65 px-4 py-2.5 text-white backdrop-blur-md sm:px-6 md:absolute md:bottom-3 md:left-8 md:right-8 md:mt-0 sm:md:bottom-4 lg:left-12 lg:right-12">
            <div className="hidden items-center gap-3 sm:flex">
              <span className="text-[10px] uppercase tracking-wider text-white/60">Faber-Castell / CGI product film / 2025</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="text-xs text-white/85">A tactile study of pigment, precision &amp; colour</span>
            </div>
            <div className="sm:hidden">
              <p className="text-[10px] uppercase text-white/70">Faber-Castell / 2025</p>
            </div>
            <Link className="btn btn-sm h-8 min-h-8 border border-white/30 bg-black/70 px-3.5 text-xs text-white shadow-none hover:bg-white hover:text-black" href="/work/polychromos-evoking-emotion">
              View case study <ArrowUpRight aria-hidden="true" size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
