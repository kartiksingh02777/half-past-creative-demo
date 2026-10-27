"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function MotionShell({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const rootElement = document.documentElement;
    const previousBehavior = rootElement.style.scrollBehavior;
    rootElement.style.scrollBehavior = "auto";

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      rootElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();
    const frame = requestAnimationFrame(resetScroll);
    const timeout = window.setTimeout(() => {
      resetScroll();
      rootElement.style.scrollBehavior = previousBehavior;
    }, 250);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      rootElement.style.scrollBehavior = previousBehavior;
    };
  }, [pathname]);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const introElements = root.current?.querySelectorAll<HTMLElement>("[data-intro]");
      if (introElements?.length) {
        gsap.from(introElements, {
          y: 42,
          duration: 1.15,
          stagger: 0.1,
          ease: "power4.out",
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 54,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-media-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: "inset(10% 0 10% 0)", scale: 1.05 },
          {
            clipPath: "inset(0% 0 0% 0)",
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 85%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: Number(element.dataset.parallax ?? 8),
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      const hero = root.current?.querySelector<HTMLElement>("#hero");
      if (hero) {
        gsap.utils.toArray<HTMLElement>("[data-hero-tile]").forEach((tile) => {
          gsap.to(tile, {
            yPercent: Number(tile.dataset.drift ?? 6),
            scale: 0.985,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
          });
        });

      }

      const partnerTrack = root.current?.querySelector<HTMLElement>(".partner-track");
      if (partnerTrack) {
        gsap.fromTo(
          partnerTrack,
          { xPercent: 0 },
          {
            xPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: partnerTrack.parentElement, start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );
      }

      const progressTrigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (progress.current) gsap.set(progress.current, { scaleX: self.progress });
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        progressTrigger.kill();
      };
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="min-h-screen overflow-x-clip bg-base-100">
      <div ref={progress} className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left scale-x-0 bg-accent" />
      {children}
    </div>
  );
}
