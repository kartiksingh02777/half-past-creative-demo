import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ContactBand, PageEyebrow } from "@/components/site-chrome";
import { process, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "Branding, marketing, film, music, motion, CGI, and AI-led production by Half Past Creative.",
};

export default function ServicesPage() {
  return (
    <main className="pt-16 lg:pt-20">
      <section className="film-grain relative min-h-[82svh] overflow-hidden bg-base-100">
        <div className="absolute right-0 top-0 h-[58%] w-[72%] sm:w-[58%] lg:w-[46%]">
          <Image alt="Faber-Castell CGI campaign" className="object-cover" data-parallax="8" fill priority sizes="50vw" src="/work/polychromos.jpg" />
        </div>
        <div className="absolute bottom-0 left-[6%] h-[38%] w-[48%] sm:w-[35%] lg:left-[10%] lg:w-[24%]">
          <Image alt="TVS Apache film campaign" className="object-cover object-[58%_center]" data-parallax="-8" fill priority sizes="30vw" src="/work/apache.jpg" />
        </div>
        <div className="absolute inset-0 bg-base-100/72" />
        <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-[1600px] flex-col justify-between px-5 pb-12 pt-10 sm:px-8 lg:px-12 lg:pb-16">
          <PageEyebrow index="02">Capabilities / Under one roof</PageEyebrow>
          <div>
            <h1 className="display-font max-w-5xl text-6xl leading-[0.84] sm:text-8xl lg:text-[9rem]" data-intro>Every stage of <span className="editorial-font font-normal italic text-base-content/55">the story.</span></h1>
            <div className="mt-8 flex flex-col gap-6 border-t border-base-content/25 pt-6 sm:flex-row sm:items-end sm:justify-between" data-intro>
              <p className="max-w-xl text-lg leading-8 text-base-content/70">A full spectrum service — from strategy and brand building to production, post, and measurable campaign delivery.</p>
              <a className="btn btn-circle border-base-content/25 bg-transparent text-base-content shadow-none hover:bg-base-content hover:text-base-100" href="#capabilities" title="View capabilities" aria-label="View capabilities"><ArrowDown size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f1ea] text-[#050505]" id="capabilities">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mb-14 grid gap-8 border-b border-black/20 pb-12 lg:grid-cols-[0.55fr_1.45fr]" data-reveal>
            <p className="text-xs uppercase text-black/50">The full spectrum</p>
            <h2 className="display-font max-w-5xl text-5xl leading-[0.95] sm:text-7xl">Everything you need. In one place.</h2>
          </div>

          {services.map((service) => (
            <article className="grid gap-8 border-b border-black/20 py-12 lg:grid-cols-[100px_0.85fr_1.15fr] lg:py-16" data-reveal key={service.number}>
              <span className="text-xs text-black/40">{service.number}</span>
              <div>
                <h3 className="display-font text-4xl leading-none sm:text-5xl">{service.name}</h3>
                <p className="mt-6 max-w-md text-lg leading-8 text-black/60">{service.summary}</p>
              </div>
              <ul className="border-t border-black/20">
                {service.deliverables.map((item, index) => (
                  <li className="flex items-center justify-between border-b border-black/20 py-4 text-sm" key={item}><span>{item}</span><span className="text-black/35">0{index + 1}</span></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-base-100 py-24 text-base-content lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 border-b border-base-content/15 pb-14 lg:grid-cols-[220px_1fr]" data-reveal>
            <p className="text-xs uppercase text-base-content/45">How it works</p>
            <h2 className="display-font text-5xl leading-[0.95] sm:text-7xl">One clear route from brief to impact.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {process.map(([number, phase, title, body]) => (
              <article className="border-b border-base-content/15 py-8 sm:border-r sm:px-6 first:pl-0 last:border-r-0 lg:min-h-80 lg:py-10" data-reveal key={number}>
                <p className="text-xs text-base-content/40">{number} / {phase}</p>
                <h3 className="display-font mt-12 text-3xl">{title}</h3>
                <p className="mt-5 leading-7 text-base-content/55">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-12"><Link className="group inline-flex items-center gap-3 border-b border-base-content/50 pb-1 text-sm" href="/studio">See how the studio works <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={17} aria-hidden="true" /></Link></div>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
