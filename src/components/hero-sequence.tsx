"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 165;
const ACTIVE_FRAME_COUNT = 126; // Final chapter climax ends here - eliminates trailing empty frames
const frameSource = (index: number) => `/media/apache-sequence-v3/frame-${String(index + 1).padStart(4, "0")}.webp`;

const heroChapters = [
  {
    eyebrow: "Half Past Creative / 01",
    title: "Branding. Marketing. Content.",
    accent: "All under one roof.",
    copy: "Where strategy meets storytelling. Over two decades turning ideas into purposeful brand experiences across film, campaigns, and digital platforms.",
    align: "left",
  },
  {
    eyebrow: "Strategy / Direction",
    title: "Clarity in thinking.",
    accent: "Strength in delivery.",
    copy: "Positioning, audience and culture give the moving image a reason to exist.",
    align: "right",
  },
] as const;

function drawCover(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  imgA: HTMLImageElement,
  imgB?: HTMLImageElement,
  alphaB: number = 0
) {
  const width = canvas.width;
  const height = canvas.height;
  if (!width || !height) return;

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  const scaleA = Math.max(width / imgA.naturalWidth, height / imgA.naturalHeight);
  const drawWidthA = imgA.naturalWidth * scaleA;
  const drawHeightA = imgA.naturalHeight * scaleA;

  context.globalAlpha = 1.0;
  context.drawImage(imgA, (width - drawWidthA) / 2, (height - drawHeightA) / 2, drawWidthA, drawHeightA);

  // Optical dissolve: smoothly blend consecutive frame with opacity to eliminate hard-cut jumps
  if (imgB?.complete && imgB.naturalWidth && alphaB > 0.01) {
    const scaleB = Math.max(width / imgB.naturalWidth, height / imgB.naturalHeight);
    const drawWidthB = imgB.naturalWidth * scaleB;
    const drawHeightB = imgB.naturalHeight * scaleB;
    context.globalAlpha = Math.min(1.0, Math.max(0, alphaB));
    context.drawImage(imgB, (width - drawWidthB) / 2, (height - drawHeightB) / 2, drawWidthB, drawHeightB);
    context.globalAlpha = 1.0;
  }
}

export function HeroSequence() {
  const root = useRef<HTMLElement>(null);
  const backgroundCanvas = useRef<HTMLCanvasElement>(null);
  const mobileVideo = useRef<HTMLVideoElement>(null);
  const currentFrame = useRef(0);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    const section = root.current;
    const background = backgroundCanvas.current;
    if (!section || !background) return;

    const ctx = background.getContext("2d", { alpha: false });
    if (!ctx) return;

    const mobile = mobileVideo.current;
    const prepareMobileVideo = () => {
      if (!mobile) return;
      mobile.pause();
      mobile.currentTime = 0;
    };
    prepareMobileVideo();
    mobile?.addEventListener("loadedmetadata", prepareMobileVideo);

    let cancelled = false;
    const loadedImages: HTMLImageElement[] = Array.from({ length: FRAME_COUNT });
    const frameObj = { frame: 0 };

    const render = (exactFrame: number) => {
      const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, exactFrame));
      const baseIndex = Math.floor(clamped);
      const nextIndex = Math.min(FRAME_COUNT - 1, baseIndex + 1);
      const fraction = clamped - baseIndex;

      const imgA = loadedImages[baseIndex];
      if (!imgA?.complete || !imgA.naturalWidth) return;
      const imgB = loadedImages[nextIndex];

      currentFrame.current = baseIndex;
      drawCover(background, ctx, imgA, imgB, fraction);
    };

    const updateCanvasDimensions = () => {
      const rect = background.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      background.width = Math.max(1, Math.floor(rect.width * ratio));
      background.height = Math.max(1, Math.floor(rect.height * ratio));
      render(frameObj.frame);
    };
    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);

    loadedImages.forEach((_, index) => {
      const image = new Image();
      image.decoding = "async";
      image.src = frameSource(index);
      image.onload = () => {
        if (cancelled) return;
        if ("decode" in image) {
          image.decode().catch(() => {}).then(() => {
            if (cancelled) return;
            loadedImages[index] = image;
            setLoaded((count) => count + 1);
            if (index === 0 || index === currentFrame.current) render(frameObj.frame);
          });
        } else {
          loadedImages[index] = image;
          setLoaded((count) => count + 1);
          if (index === 0 || index === currentFrame.current) render(frameObj.frame);
        }
      };
    });

    const media = gsap.matchMedia();

    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const chapters = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-chapter]"));
      gsap.set(chapters, { autoAlpha: 0, yPercent: 12 });
      gsap.set(chapters[0], { autoAlpha: 1, yPercent: 0 });

      // Silky inertia scrub: 0.65 provides liquid deceleration so the video glides like butter
      const frameTween = gsap.to(frameObj, {
        frame: ACTIVE_FRAME_COUNT - 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top+=80",
          end: "bottom bottom",
          scrub: 0.65,
          onUpdate: () => {
            render(frameObj.frame);
          },
        },
      });

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top+=80", end: "bottom bottom", scrub: 0.65 },
      });

      timeline.to(chapters[0], { autoAlpha: 1, duration: 0.5 });
      chapters.slice(1).forEach((chapter, index) => {
        const previous = chapters[index];
        timeline
          .to(previous, { autoAlpha: 0, yPercent: -10, duration: 0.16, ease: "power2.in" })
          .fromTo(chapter, { autoAlpha: 0, yPercent: 12 }, { autoAlpha: 1, yPercent: 0, duration: 0.22, ease: "power2.out" }, "<0.06")
          .to(chapter, { autoAlpha: 1, duration: 0.5 });
      });
      timeline
        .to("[data-hero-intro]", { opacity: 0, yPercent: -30, duration: 0.16 }, 0.18)
        .to("[data-hero-outro]", { opacity: 1, yPercent: 0, duration: 0.18 }, 0.9);

      return () => {
        frameTween.kill();
        timeline.kill();
      };
    });

    media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      const mobileTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top+=64",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (!mobile || mobile.readyState < 1) return;
          mobile.currentTime = self.progress * Math.min(mobile.duration || 6.6, 6.6);
        },
      });
      return () => mobileTrigger.kill();
    });

    return () => {
      cancelled = true;
      media.revert();
      mobile?.removeEventListener("loadedmetadata", prepareMobileVideo);
      window.removeEventListener("resize", updateCanvasDimensions);
    };
  }, []);

  const loadingPercent = Math.round((loaded / FRAME_COUNT) * 100);

  return (
    <section ref={root} className="hero-sequence film-grain relative h-[180svh] bg-base-100 md:h-[200svh]" id="hero" aria-labelledby="hero-title">
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden bg-base-100 lg:top-20 lg:h-[calc(100svh-5rem)]">
        <video ref={mobileVideo} aria-hidden="true" className="absolute inset-0 z-10 h-full w-full object-cover md:hidden" muted playsInline poster="/work/apache.jpg" preload="auto" src="/media/previews/apache-mobile-v3.mp4" />
        <canvas ref={backgroundCanvas} aria-hidden="true" className="absolute inset-0 z-10 hidden h-full w-full md:block" data-hero-canvas="background" />
        <div className="absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(0,0,0,.58)_0%,rgba(0,0,0,.12)_55%,rgba(0,0,0,.36)_100%)]" />

        <div className="absolute inset-x-5 top-5 z-40 flex justify-between gap-5 text-[10px] uppercase text-white/82 [text-shadow:0_2px_12px_rgba(0,0,0,.95)] sm:inset-x-8 sm:text-xs lg:inset-x-12" data-hero-intro>
          <span>Media &amp; marketing consultancy</span>
        </div>

        <div className="pointer-events-none absolute inset-x-5 top-[12%] z-30 h-[70%] sm:inset-x-8 lg:inset-x-12 lg:top-[10%]">
          {heroChapters.map((chapter, index) => (
            <div
              className={`absolute inset-x-0 top-0 ${index === 0 ? "opacity-100" : "hidden opacity-0 md:top-[16%] md:block md:w-[min(32rem,42vw)] md:rounded md:border md:border-white/30 md:bg-black/65 md:p-5 md:shadow-[0_20px_60px_rgba(0,0,0,0.5)] md:backdrop-blur-md lg:top-[14%] lg:p-6"} ${chapter.align === "right" ? "md:inset-x-auto md:right-0 md:ml-auto md:text-right" : "md:inset-x-auto md:left-0 md:mr-auto"} ${index === 0 ? "md:max-w-[68rem]" : ""}`}
              data-hero-chapter
              key={chapter.eyebrow}
            >
              <p className={`mb-3 flex items-center gap-2.5 text-[10px] uppercase tracking-wider text-white/75 [text-shadow:0_2px_12px_rgba(0,0,0,.95)] ${chapter.align === "right" ? "md:justify-end" : ""}`}>
                <span className="h-px w-8 bg-primary" />
                {chapter.eyebrow}
              </p>
              <h1 id={index === 0 ? "hero-title" : undefined} className={`font-semibold uppercase text-base-content [text-shadow:0_5px_36px_rgba(0,0,0,.76)] ${index === 0 ? "text-4xl leading-[0.92] sm:text-7xl lg:text-[6.5rem] xl:text-[7.5rem]" : "text-3xl leading-[0.96] sm:text-4xl md:text-[2.6rem] lg:text-[3.2rem] xl:text-[3.5rem]"} ${chapter.align === "right" ? "md:ml-auto" : ""}`}>
                <span className="block">{chapter.title}</span>
                <span className="editorial-font mt-1 block normal-case italic text-secondary">{chapter.accent}</span>
              </h1>
              <p className={`mt-4 max-w-sm border-l-2 border-primary pl-3.5 text-xs leading-5 text-white/85 sm:text-sm sm:leading-6 ${chapter.align === "right" ? "md:ml-auto md:border-l-0 md:border-r-2 md:pl-0 md:pr-3.5" : ""}`}>{chapter.copy}</p>
            </div>
          ))}
        </div>

        {/* Slim, elegant bottom control bar fitted directly to content */}
        <div className="absolute inset-x-5 bottom-3 z-50 flex items-center justify-between gap-4 border-t border-white/25 bg-black/65 px-4 py-2.5 text-white backdrop-blur-md sm:inset-x-8 sm:bottom-4 sm:px-6 lg:inset-x-12">
          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-[10px] uppercase tracking-wider text-white/60">Frame sequence / {ACTIVE_FRAME_COUNT}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-xs text-white/85">Strategy, film, music &amp; motion to final master</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-[10px] uppercase tracking-wider text-white/50" data-hero-frame-note>
              {loaded < FRAME_COUNT ? `Loading ${loadingPercent}%` : "Scroll controls time"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link className="btn btn-sm h-8 min-h-8 border-0 bg-[#d65b4c] px-3.5 text-xs text-white shadow-none hover:bg-[#82c9e0] hover:text-black" href="#projects">
              Explore work <ArrowRight aria-hidden="true" size={14} />
            </Link>
            <a className="btn btn-circle btn-sm h-8 min-h-8 w-8 border-0 bg-[#82c9e0] text-black shadow-none hover:bg-[#f5f1e8]" href="#projects" aria-label="Continue to projects" title="Continue to projects">
              <ArrowDown aria-hidden="true" size={15} />
            </a>
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-14 left-1/2 z-40 -translate-x-1/2 text-center text-xs uppercase tracking-widest text-white/80 opacity-0" data-hero-outro>Work enters the frame</p>
      </div>
    </section>
  );
}
