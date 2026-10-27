"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useRef } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StorySequence() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-project-chapter]").forEach((chapter) => {
          const main = chapter.querySelector("[data-chapter-media]");
          const copy = chapter.querySelector("[data-chapter-copy]");
          const slices = chapter.querySelectorAll("[data-chapter-slice]");

          gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: chapter, start: "top 80px", end: "bottom bottom", scrub: 0.75 },
          })
            .fromTo(main, { scale: 1.08, clipPath: "inset(12% 7% 12% 7%)" }, { scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.85 })
            .fromTo(slices, { yPercent: (index) => (index ? 80 : -75), xPercent: (index) => (index ? -22 : 20) }, { yPercent: 0, xPercent: 0, stagger: 0.08, duration: 0.72 }, 0.2)
            .fromTo(copy, { yPercent: 30, opacity: 0.25 }, { yPercent: 0, opacity: 1, duration: 0.55 }, 0.28)
            .to(main, { scale: 1.04, duration: 0.7 })
            .to(slices, { yPercent: (index) => (index ? -36 : 42), duration: 0.7 }, "<");
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-[#f3f1ea] text-[#050505]" id="projects" aria-labelledby="projects-title">
      <div className="mx-auto max-w-[1800px] px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col justify-between gap-8 border-b border-black/20 pb-10 lg:flex-row lg:items-end" data-reveal>
          <div>
            <p className="mb-5 text-xs uppercase text-black/45">Selected work</p>
            <h2 id="projects-title" className="text-5xl font-semibold uppercase leading-[0.86] sm:text-7xl lg:text-8xl">Projects in motion.</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-black/55">Four campaign stories. Each receives its own visual chapter, pacing, and motion language.</p>
        </div>

        <div className="grid border-b border-black/20 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <a className="group border-b border-black/20 py-6 sm:border-r sm:px-5 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0" href={`#${project.slug}`} key={project.slug}>
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image alt={`${project.client} project preview`} className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" src={project.image} />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3 text-xs uppercase">
                <span>{project.number} / {project.client}</span><ArrowUpRight aria-hidden="true" size={15} />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-black/20">
        {projects.map((project, index) => (
          <article
            className="project-chapter relative border-b border-black/20 bg-[#f3f1ea] lg:h-[180svh]"
            data-project-chapter
            id={project.slug}
            key={project.slug}
            style={{ "--chapter-accent": project.accent } as CSSProperties}
          >
            <div className="mx-auto grid max-w-[1800px] gap-10 px-5 py-20 sm:px-8 lg:sticky lg:top-20 lg:h-[calc(100svh-5rem)] lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-12 lg:overflow-hidden lg:px-12 lg:py-8">
              <div className="relative z-30 flex flex-col justify-between lg:h-[78%]" data-chapter-copy>
                <div className="flex justify-between border-b border-black/20 pb-4 text-xs uppercase text-black/45">
                  <span>{project.number} / 04</span><span>{project.year} / {project.category}</span>
                </div>
                <div className="my-12 lg:my-0">
                  <p className="mb-5 text-xs uppercase" style={{ color: project.accent }}>{project.client}</p>
                  <h3 className="max-w-[9ch] text-5xl font-semibold uppercase leading-[0.84] sm:text-7xl lg:text-8xl">{project.shortTitle}</h3>
                  <p className="editorial-font mt-5 text-2xl italic text-black/55">{project.discipline}</p>
                </div>
                <div className="border-t border-black/20 pt-5">
                  <p className="max-w-lg leading-7 text-black/58">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link className="btn btn-sm border-black/25 bg-transparent text-black shadow-none hover:bg-black hover:text-white" href={`/work/${project.slug}`}>
                      Case study <ArrowUpRight aria-hidden="true" size={16} />
                    </Link>
                    {project.video ? (
                      <a className="btn btn-sm btn-ghost text-black shadow-none" href={project.video} rel="noreferrer" target="_blank">
                        Watch film <Play aria-hidden="true" fill="currentColor" size={14} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="relative min-h-[62svh] overflow-hidden bg-black lg:h-[78%]" data-chapter-media>
                <Image alt={`${project.client} - ${project.shortTitle}`} className="object-cover" fill priority={index === 0} sizes="(max-width: 1024px) 100vw, 64vw" src={project.image} />
                <div className="absolute inset-y-[7%] left-[8%] w-[22%] overflow-hidden border border-white/35" data-chapter-slice>
                  <Image alt="" aria-hidden="true" className="object-cover" fill sizes="16vw" src={project.image} />
                </div>
                <div className="absolute bottom-[8%] right-[7%] h-[31%] w-[38%] overflow-hidden border border-white/35" data-chapter-slice>
                  <Image alt="" aria-hidden="true" className="object-cover" fill sizes="26vw" src={project.image} />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/30 bg-black/65 px-4 py-3 text-[10px] uppercase text-white/65">
                  <span>Sequence {project.number}</span><span>{project.craft.join(" / ")}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
