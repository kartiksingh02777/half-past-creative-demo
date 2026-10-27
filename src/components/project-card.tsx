import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import type { Project } from "@/data/site";

export function ProjectCard({ project, priority = false, compact = false }: { project: Project; priority?: boolean; compact?: boolean }) {
  return (
    <article className="group min-w-0" data-reveal>
      <Link href={`/work/${project.slug}`} className="block">
        <div className={`relative overflow-hidden rounded-[4px] bg-base-300 ${compact ? "aspect-[4/3]" : "aspect-video"}`} data-media-reveal>
          <Image
            alt={`${project.client} - ${project.shortTitle}`}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
            fill
            priority={priority}
            sizes={compact ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 70vw"}
            src={project.image}
          />
          <div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/20" />
          <span className="btn btn-circle absolute bottom-4 right-4 border-0 bg-[#f3f1ea] text-[#050505]! shadow-none sm:bottom-6 sm:right-6" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-5 border-t border-base-content/15 pt-4">
          <div>
            <p className="text-xs uppercase text-base-content/50">{project.client} / {project.year}</p>
            <h2 className="display-font mt-2 text-3xl leading-none sm:text-4xl">{project.shortTitle}</h2>
          </div>
          <span className="pt-1 text-xs text-base-content/45">{project.number}</span>
        </div>
      </Link>
    </article>
  );
}

export function WatchLink({ project }: { project: Project }) {
  if (!project.video) return null;
  return (
    <a className="btn rounded-field border-0 bg-[#f3f1ea] text-[#050505]! shadow-none hover:bg-white" href={project.video} rel="noreferrer" target="_blank">
      <Play aria-hidden="true" fill="currentColor" size={16} /> Watch film
    </a>
  );
}
