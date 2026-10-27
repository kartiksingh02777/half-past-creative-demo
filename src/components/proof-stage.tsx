"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { contact, testimonials } from "@/data/site";

export function ProofStage() {
  const [active, setActive] = useState(0);
  const quote = testimonials[active];

  return (
    <>
      <section className="bg-base-100 px-5 py-24 text-base-content sm:px-8 lg:px-12 lg:py-32" id="partner-proof" aria-labelledby="proof-title">
        <div className="mx-auto max-w-[1800px]">
          <p className="mb-7 text-xs uppercase text-secondary">05 / Partner proof</p>
          <h2 id="proof-title" className="max-w-[12ch] text-5xl font-semibold uppercase leading-[0.84] sm:text-7xl lg:text-8xl">What our partners say.</h2>

          <div className="mt-16 grid gap-12 border-t border-base-content/20 pt-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div role="tablist" aria-label="Partner quotes">
              {testimonials.map((item, index) => (
                <button
                  aria-selected={active === index}
                  className={`btn btn-ghost grid h-auto min-h-0 w-full grid-cols-[44px_1fr_24px] justify-items-start rounded-none border-b border-base-content/20 px-0 py-6 text-left shadow-none ${active === index ? "text-base-content" : "text-base-content/38"}`}
                  key={item.name}
                  onClick={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  role="tab"
                  type="button"
                >
                  <span className="text-xs">0{index + 1}</span>
                  <span><strong className="block text-lg font-medium">{item.name}</strong><span className="mt-1 block text-xs uppercase">{item.role}</span></span>
                  <ArrowUpRight aria-hidden="true" className="justify-self-end" size={17} />
                </button>
              ))}
            </div>

            <blockquote className="flex min-h-[360px] flex-col justify-between border-l border-base-content/20 pl-6 sm:pl-10" aria-live="polite">
              <p className="editorial-font text-4xl leading-[1.05] text-base-content sm:text-5xl lg:text-6xl">&ldquo;{quote.quote}&rdquo;</p>
              <footer className="mt-10 text-xs uppercase text-base-content/45">{quote.name} / {quote.role}</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="border-t border-base-content/20 bg-base-100 px-5 py-24 text-base-content sm:px-8 lg:px-12 lg:py-32" id="project-start">
        <div className="mx-auto max-w-[1800px]" data-reveal>
          <p className="mb-8 text-xs uppercase text-secondary">06 / Start a project</p>
          <Link className="group flex items-end justify-between gap-6 border-b border-base-content/30 pb-8" href="/contact">
            <span className="max-w-[12ch] text-5xl font-semibold uppercase leading-[0.84] sm:text-7xl lg:text-8xl xl:text-[8.5rem]">Have an idea? Let&apos;s put it into motion.</span>
            <ArrowUpRight className="mb-2 shrink-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" aria-hidden="true" size={48} strokeWidth={1.3} />
          </Link>
          <div className="mt-8 grid gap-4 text-sm text-base-content/55 sm:grid-cols-3">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <span className="sm:text-right">{contact.address}</span>
          </div>
        </div>
      </section>
    </>
  );
}
