"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user already saw the intro in this session to avoid annoyance on navigation
    const hasSeenIntro = sessionStorage.getItem("hpc_intro_seen");
    if (hasSeenIntro) {
      setIsVisible(false);
      return;
    }

    // Smooth progress counter from 0 to 100 over 2.6 seconds
    const startTime = Date.now();
    const duration = 2600;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Start graceful fade out
        setTimeout(() => {
          setIsFadingOut(true);
          sessionStorage.setItem("hpc_intro_seen", "true");
        }, 300);
        // Remove completely from DOM
        setTimeout(() => {
          setIsVisible(false);
        }, 950);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setIsFadingOut(true);
    sessionStorage.setItem("hpc_intro_seen", "true");
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      aria-label="Loading Half Past Creative"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#08090d] px-6 py-10 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Top subtle branding strip */}
      <div className="flex w-full max-w-6xl items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
        <span>Est. Mumbai</span>
        <span>Creative Production &amp; Consultancy</span>
      </div>

      {/* Center animated brand emblem */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6 aspect-[3/2] w-52 sm:w-64">
          <Image
            src="/brand/loading-logo.png"
            alt="Half Past Creative"
            fill
            priority
            className="object-contain drop-shadow-[0_4px_30px_rgba(214,91,76,0.22)]"
          />
        </div>

        <p className="max-w-sm text-xs font-light tracking-wide text-white/60 sm:text-sm">
          Where strategy meets storytelling.
        </p>

        {/* Minimal Progress Bar */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
            <div
              className="h-full bg-gradient-to-r from-[#d65b4c] via-[#e2a865] to-[#82c9e0] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-[10px] tracking-wider text-white/45">
            {progress}%
          </span>
        </div>
      </div>

      {/* Bottom control / skip link */}
      <div className="flex w-full max-w-6xl items-center justify-between text-[11px] text-white/40">
        <span className="font-mono text-[10px]">Vashi, Navi Mumbai</span>
        <button
          onClick={handleSkip}
          className="border-b border-white/20 pb-0.5 text-white/60 transition-colors hover:border-white hover:text-white"
        >
          Skip intro &rarr;
        </button>
      </div>
    </div>
  );
}
