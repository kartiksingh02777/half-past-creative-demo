import type { Metadata } from "next";
import Image from "next/image";
import { ContactBand, PageEyebrow } from "@/components/site-chrome";
import { WorkIndex } from "@/components/work-index";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected film, CGI, product, and music work by Half Past Creative.",
};

export default function WorkPage() {
  return (
    <main className="pt-16 lg:pt-20">
      <section className="relative min-h-[72svh] overflow-hidden bg-base-100">
        <Image alt="Birla Opus One Aero campaign" className="object-cover object-center opacity-65" data-parallax="8" fill loading="eager" priority sizes="100vw" src="/work/one-aero.jpg" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-[1600px] flex-col justify-end px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
          <PageEyebrow index="01">Selected work / 2024-2025</PageEyebrow>
          <h1 className="display-font max-w-6xl text-6xl leading-[0.84] sm:text-8xl lg:text-[9rem]" data-intro>Ideas become useful <span className="editorial-font font-normal italic text-base-content/55">when they move.</span></h1>
        </div>
      </section>

      <section className="bg-base-100 py-20 lg:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="mb-14 grid gap-8 border-b border-base-content/15 pb-12 lg:grid-cols-[0.7fr_1.3fr]" data-reveal>
            <p className="text-xs uppercase text-base-content/45">Portfolio index</p>
            <p className="max-w-3xl text-xl leading-9 text-base-content/65">Commercial film, fully rendered product worlds, and launch experiences, each shaped around the idea rather than a fixed production formula.</p>
          </div>
          <WorkIndex />
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
