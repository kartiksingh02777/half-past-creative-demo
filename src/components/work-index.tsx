"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/site";

const categories = ["All", "Film", "CGI", "Music"] as const;

export function WorkIndex() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const filtered = category === "All" ? projects : projects.filter((project) => project.category === category);

  return (
    <>
      <div className="tabs mb-16 grid w-full grid-cols-2 border-l border-t border-base-content/20 sm:grid-cols-4" role="tablist" aria-label="Filter work by category">
        {categories.map((item, index) => {
          const count = item === "All" ? projects.length : projects.filter((project) => project.category === item).length;
          const active = category === item;
          return (
            <button
              aria-selected={active}
              className={`tab h-20 justify-between border-b border-r border-base-content/20 px-4 text-left text-sm transition-colors sm:h-24 sm:px-5 ${active ? "bg-[#f3f1ea] text-[#050505]" : "text-base-content/45 hover:bg-base-content/5 hover:text-base-content"}`}
              key={item}
              onClick={() => setCategory(item)}
              role="tab"
              type="button"
            >
              <span><span className="mr-3 text-[10px] opacity-50">0{index + 1}</span>{item}</span>
              <span className="text-[10px] opacity-50">{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-base-content/20">
        {filtered.map((project, index) => (
          <article className="group border-b border-base-content/20 py-7 lg:py-10" data-reveal key={project.slug}>
            <Link className="grid gap-5 lg:grid-cols-[64px_minmax(0,1.35fr)_minmax(260px,0.65fr)_40px] lg:items-center" href={`/work/${project.slug}`}>
              <span className="text-xs text-base-content/35">{project.number}</span>
              <div className={`relative overflow-hidden bg-base-300 ${index % 2 === 0 ? "aspect-[16/9]" : "aspect-[16/8]"}`} data-media-reveal>
                <Image alt={`${project.client} - ${project.shortTitle}`} className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" fill priority={true} sizes="(max-width: 1024px) calc(100vw - 40px), 58vw" src={project.image} />
              </div>
              <div className="border-t border-base-content/15 pt-5 lg:border-0 lg:pt-0">
                <p className="text-xs uppercase text-base-content/40">{project.client} / {project.year}</p>
                <h2 className="mt-4 text-4xl font-semibold leading-[0.95] sm:text-5xl">{project.shortTitle}</h2>
                <p className="editorial-font mt-4 text-xl italic text-base-content/45">{project.discipline}</p>
              </div>
              <span className="btn btn-circle border-base-content/20 bg-transparent text-base-content shadow-none transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-[#f3f1ea] group-hover:text-[#050505]" aria-hidden="true"><ArrowUpRight size={17} /></span>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
