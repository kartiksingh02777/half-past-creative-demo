"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CapabilitiesStage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const slides = gsap.utils.toArray<HTMLElement>("[data-service-slide]");
        const labels = gsap.utils.toArray<HTMLElement>("[data-service-label]");
        gsap.set(slides.slice(1), { autoAlpha: 0, yPercent: 28 });
        gsap.set(labels.slice(1), { opacity: 0.28 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top 80px", end: "bottom bottom", scrub: 0.65 },
        });

        services.slice(1).forEach((_, index) => {
          const next = index + 1;
          timeline
            .to(slides[index], { autoAlpha: 0, yPercent: -24, duration: 0.42 })
            .to(labels[index], { opacity: 0.28, duration: 0.18 }, "<")
            .to(slides[next], { autoAlpha: 1, yPercent: 0, duration: 0.58 }, "<0.12")
            .to(labels[next], { opacity: 1, duration: 0.18 }, "<");
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="service-reel relative bg-base-100 text-base-content lg:h-[520svh]" id="services" aria-labelledby="services-title">
      <div className="px-5 py-24 sm:px-8 lg:sticky lg:top-20 lg:flex lg:h-[calc(100svh-5rem)] lg:flex-col lg:overflow-hidden lg:px-12 lg:py-7">
        <header className="mx-auto w-full max-w-[1800px] border-b border-base-content/20 pb-6">
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-xs uppercase text-secondary">Capabilities</p>
              <h2 id="services-title" className="max-w-[12ch] text-5xl font-semibold uppercase leading-[0.86] sm:text-7xl lg:text-8xl">Everything you need. In one place.</h2>
            </div>
            <Link className="btn btn-ghost h-auto min-h-0 self-start rounded-none border-b border-base-content/30 px-0 py-2 text-base-content shadow-none hover:bg-transparent sm:self-end" href="/services">
              All services <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </div>

          <div className="mt-8 hidden grid-cols-7 border-t border-base-content/15 lg:grid">
            {services.map((service) => (
              <span className="border-r border-base-content/15 px-3 py-4 text-[10px] uppercase text-base-content last:border-r-0" data-service-label key={service.number}>
                {service.number}<span className="mt-2 block text-base-content/45">{service.name}</span>
              </span>
            ))}
          </div>
        </header>

        <div className="mx-auto mt-10 hidden min-h-0 w-full max-w-[1800px] flex-1 grid-cols-[1.15fr_0.85fr] border-y border-base-content/20 lg:grid">
          <div className="relative overflow-hidden border-r border-base-content/20">
            {services.map((service) => (
              <article className="absolute inset-0 flex flex-col justify-between p-8 xl:p-12" data-service-slide key={service.number}>
                <div className="flex items-start justify-between text-xs uppercase text-base-content/45">
                  <span>{service.number} / 07</span><span>One connected studio</span>
                </div>
                <div>
                  <p className="mb-5 max-w-xl text-lg leading-8 text-base-content/52">{service.summary}</p>
                  <h3 className={`max-w-full break-words font-semibold uppercase leading-[0.82] ${service.name.length > 16 ? "text-5xl xl:text-[6rem]" : "text-6xl xl:text-[7.5rem]"}`}>{service.name}</h3>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-base-content/20 pt-5 text-xs uppercase text-base-content/48">
                  {service.deliverables.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>

          <div className="technical-field relative overflow-hidden bg-base-200" aria-hidden="true">
            <div className="absolute inset-[12%] border border-secondary/35" />
            <div className="absolute left-[20%] top-[18%] h-[64%] w-[64%] rounded-full border border-base-content/18" />
            <div className="absolute left-[30%] top-[28%] h-[44%] w-[44%] rotate-45 border border-[#d29979]/55" />
            <div className="absolute left-1/2 top-[8%] h-[84%] w-px bg-base-content/18" />
            <div className="absolute left-[8%] top-1/2 h-px w-[84%] bg-base-content/18" />
            <div className="absolute bottom-6 left-6 text-[10px] uppercase text-base-content/40">Signal / image / sound / movement</div>
          </div>
        </div>

        <div className="mt-12 grid gap-0 border-t border-base-content/20 lg:hidden">
          {services.map((service) => (
            <article className="border-b border-base-content/20 py-7" data-reveal key={service.number}>
              <div className="flex justify-between text-xs uppercase text-secondary"><span>{service.number}</span><span>Capability</span></div>
              <h3 className="mt-8 text-4xl font-semibold uppercase leading-[0.9]">{service.name}</h3>
              <p className="mt-5 leading-7 text-base-content/55">{service.summary}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="border-t border-base-content/20 bg-[#f3f1ea] px-5 py-20 text-[#050505] sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1800px] gap-12 lg:grid-cols-[0.65fr_1.35fr]" data-reveal>
          <p className="text-xs uppercase text-black/45">One delivery system</p>
          <h3 className="text-5xl font-semibold uppercase leading-[0.86] sm:text-7xl lg:text-8xl">One team.<br /><span className="editorial-font normal-case italic text-black/55">Work that speaks.</span></h3>
        </div>
      </div>
    </section>
  );
}
