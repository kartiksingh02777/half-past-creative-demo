"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/site";
import { ProjectDepthScene } from "@/components/project-depth-scene";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const previews: Record<string, string> = {
  "apache-built-to-order": "/media/previews/apache.mp4",
  "polychromos-evoking-emotion": "/media/previews/polychromos.mp4",
  "one-aero-aerosol-mastery": "/media/previews/one-aero.mp4",
  "ebella-ev-launch-music": "/media/previews/ebella.mp4",
  "birla-studios-logo-animation": "/media/previews/birla-studios.mp4",
};

export function ProjectsInMotion() {
  const root = useRef<HTMLElement>(null);
  const [activeFilmIndex, setActiveFilmIndex] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-film-card]");
        const infoPanels = gsap.utils.toArray<HTMLElement>("[data-film-info]");
        const tabs = gsap.utils.toArray<HTMLElement>("[data-film-tab]");

        gsap.set(cards, { clearProps: "transform,opacity,visibility" });
        gsap.set(cards, { yPercent: 100 });
        gsap.set(cards[0], { yPercent: 0 });

        gsap.set(infoPanels, { autoAlpha: 0, y: 15 });
        gsap.set(infoPanels[0], { autoAlpha: 1, y: 0 });

        gsap.set(tabs, { opacity: 0.35, borderColor: "rgba(255,255,255,0.15)" });
        gsap.set(tabs[0], { opacity: 1, borderColor: "rgba(130,201,224,0.9)" });

        const timeline = gsap.timeline({
          defaults: { ease: "power1.inOut" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top+=80",
            end: "bottom bottom",
            scrub: 1.0,
          },
        });

        cards.slice(1).forEach((card, index) => {
          const nextInfo = infoPanels[index + 1];
          const prevInfo = infoPanels[index];
          const nextTab = tabs[index + 1];
          const prevTab = tabs[index];

          timeline
            .to({}, { duration: 0.5 })
            .fromTo(card, { yPercent: 100 }, { yPercent: 0, duration: 0.8 }, "<")
            .to(prevInfo, { autoAlpha: 0, y: -15, duration: 0.3 }, "<")
            .to(nextInfo, { autoAlpha: 1, y: 0, duration: 0.4 }, "<0.2")
            .to(prevTab, { opacity: 0.35, borderColor: "rgba(255,255,255,0.15)", duration: 0.3 }, "<")
            .to(nextTab, { opacity: 1, borderColor: "rgba(130,201,224,0.9)", duration: 0.3 }, "<")
            .to({}, { duration: 0.5 });
        });
      });

      return () => media.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="catalog-section relative bg-base-100 text-base-content lg:h-[520svh]" id="projects" aria-labelledby="projects-title">
      {/* Sticky Split-Screen Stage with 3D Background active */}
      <div className="relative px-5 py-12 sm:px-8 lg:sticky lg:top-20 lg:flex lg:h-[calc(100svh-5rem)] lg:items-center lg:overflow-hidden lg:px-12 lg:py-6">
        <ProjectDepthScene />

        <div className="relative z-10 mx-auto flex w-full max-w-[1720px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          
          {/* LEFT COLUMN: Editorial Typography, Active Details, and Film Switcher */}
          <div className="flex w-full flex-col justify-between lg:w-[40%] xl:w-[38%]">
            {/* Section Header */}
            <div>
              <div className="mb-2 flex items-center gap-3 text-[11px] uppercase tracking-wider text-[#82c9e0]">
                <span className="h-px w-8 bg-[#82c9e0]" />
                Selected work // 01-05
              </div>
              <h2 id="projects-title" className="text-4xl font-semibold uppercase leading-[0.9] sm:text-5xl xl:text-6xl">
                Projects in <span className="editorial-font normal-case italic text-secondary">motion.</span>
              </h2>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-base-content/70 sm:text-sm">
                Five campaign films. Five distinct visual languages. Built with engineered precision.
              </p>
            </div>

            {/* Interactive Film Tabs */}
            <div className="my-5 flex flex-wrap gap-2">
              {projects.map((project, index) => (
                <button
                  type="button"
                  key={project.slug}
                  data-film-tab
                  onClick={() => setActiveFilmIndex(index)}
                  className={`flex cursor-pointer items-center gap-2 border px-3 py-2 text-[11px] uppercase transition-all duration-300 backdrop-blur-[4px] ${
                    activeFilmIndex === index
                      ? "border-[#82c9e0] bg-black/85 text-white"
                      : "border-white/15 bg-black/60 text-white/90 hover:border-white/40"
                  }`}
                >
                  <span className="font-mono text-[#82c9e0]">{project.number}</span>
                  <span className="truncate">{project.client.split(" ").slice(0, 2).join(" ")}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Project Details Stage */}
            <div className="relative min-h-[220px] sm:min-h-[200px]">
              {projects.map((project, index) => (
                <div
                  key={project.slug}
                  data-film-info
                  className={`flex flex-col justify-between gap-4 border-l-2 border-[#82c9e0] bg-black/65 p-5 backdrop-blur-[6px] transition-opacity duration-300 ${
                    index === activeFilmIndex ? "relative opacity-100" : "absolute inset-0 opacity-0 pointer-events-none lg:pointer-events-auto"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] uppercase text-[#82c9e0]">
                      <span>{project.number} / 05 &mdash; {project.client}</span>
                      <span className="text-white/60">{project.year}</span>
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold uppercase text-white sm:text-3xl">
                      {project.shortTitle}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/75 sm:text-sm">
                      {project.description}
                    </p>
                    <p className="mt-1 text-[11px] uppercase text-white/50">
                      Discipline: {project.discipline}
                    </p>
                  </div>

                  <div>
                    <Link
                      className="btn btn-sm inline-flex items-center gap-2 border-0 bg-[#d65b4c] text-xs uppercase text-white shadow-none hover:bg-[#82c9e0] hover:text-black"
                      href={`/work/${project.slug}`}
                    >
                      View project <ArrowUpRight aria-hidden="true" size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Stacked 16:9 Cinema Screen Stage (All 4 Videos Slide Up Sequentially) */}
          <div className="relative flex w-full items-center justify-center lg:w-[58%] xl:w-[60%]">
            <div className="relative aspect-video w-full max-w-[880px] overflow-hidden rounded border border-white/25 bg-black shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
              {projects.map((project, index) => (
                <article
                  key={project.slug}
                  data-film-card
                  className={`absolute inset-0 flex flex-col overflow-hidden bg-black transition-opacity duration-300 ${
                    index === activeFilmIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none lg:pointer-events-auto lg:opacity-100"
                  }`}
                  style={{ zIndex: index + 1 }}
                >
                  {/* Video Stage */}
                  <div className="relative h-full w-full overflow-hidden bg-black">
                    {previews[project.slug] ? (
                      <video
                        autoPlay
                        className="absolute inset-0 h-full w-full object-cover"
                        loop
                        muted
                        playsInline
                        poster={project.image}
                        preload="metadata"
                        src={previews[project.slug]}
                      />
                    ) : (
                      <Image
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        fill
                        priority={index === 0}
                        src={project.image}
                      />
                    )}

                    {/* Clean Top Film Bar */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/20 bg-black/70 px-4 py-2.5 text-[10px] uppercase tracking-wider text-white/90 backdrop-blur-[4px]">
                      <span className="flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#d65b4c]" />
                        Film {project.number} &mdash; {project.client}
                      </span>
                      <span>{project.year} / {project.category}</span>
                    </div>

                    {/* Bottom Title Watermark */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 text-white">
                      <span className="text-xs uppercase tracking-wider text-white/90">
                        {project.title}
                      </span>
                      <span className="font-mono text-[10px] uppercase text-[#82c9e0]">
                        4K Master
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
