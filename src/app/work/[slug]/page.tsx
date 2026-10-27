import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactBand } from "@/components/site-chrome";
import { WatchLink } from "@/components/project-card";
import { projects } from "@/data/site";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.description } : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  if (projectIndex < 0) notFound();
  const project = projects[projectIndex];
  const next = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="pt-16 lg:pt-20">
      <section className="bg-base-100 px-5 pb-12 pt-10 sm:px-8 lg:px-12 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-[1600px]">
          <Link className="mb-14 inline-flex items-center gap-2 text-xs uppercase text-base-content/50 hover:text-base-content" href="/work"><ArrowLeft size={15} aria-hidden="true" /> All work</Link>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div data-intro>
              <p className="mb-5 text-xs uppercase text-accent">{project.number} / {project.client} / {project.year}</p>
              <p className="max-w-md text-lg leading-8 text-base-content/60">{project.description}</p>
            </div>
            <h1 className="display-font text-6xl leading-[0.86] sm:text-8xl lg:text-[8.5rem]" data-intro>{project.shortTitle}</h1>
          </div>
        </div>
      </section>

      <section className="px-0 sm:px-5 lg:px-8">
        <div className="relative mx-auto aspect-video max-w-[1800px] overflow-hidden bg-base-300 sm:rounded-[4px]" data-media-reveal>
          <Image alt={`${project.client} - ${project.shortTitle}`} className="object-cover" data-parallax="5" fill loading="eager" priority sizes="100vw" src={project.image} />
          <div className="absolute bottom-5 right-5 z-10 sm:bottom-8 sm:right-8"><WatchLink project={project} /></div>
        </div>
      </section>

      <section className="bg-[#f3f1ea] py-20 text-[#050505] lg:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]" data-reveal>
            <div>
              <p className="text-xs uppercase text-black/50">Project scope</p>
              <dl className="mt-8 border-t border-black/20 text-sm">
                <div className="flex justify-between gap-6 border-b border-black/20 py-4"><dt className="text-black/45">Client</dt><dd className="text-right">{project.client}</dd></div>
                <div className="flex justify-between gap-6 border-b border-black/20 py-4"><dt className="text-black/45">Year</dt><dd>{project.year}</dd></div>
                <div className="flex justify-between gap-6 border-b border-black/20 py-4"><dt className="text-black/45">Field</dt><dd>{project.category}</dd></div>
              </dl>
            </div>
            <div>
              <p className="display-font max-w-4xl text-4xl leading-tight sm:text-6xl">{project.overview}</p>
              <div className="mt-14 grid gap-5 sm:grid-cols-3">
                {project.craft.map((item, index) => (
                  <div className="border-t border-black/25 pt-4" key={item}><span className="text-xs text-black/40">0{index + 1}</span><p className="mt-8 text-lg">{item}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100 py-20 lg:py-28">
        <Link className="group mx-auto block max-w-[1600px] px-5 sm:px-8 lg:px-12" href={`/work/${next.slug}`} data-reveal>
          <p className="mb-5 flex items-center justify-between text-xs uppercase text-base-content/45"><span>Next project</span><span>{next.number} / {next.client}</span></p>
          <div className="grid gap-8 border-t border-base-content/20 pt-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <h2 className="display-font text-5xl leading-none sm:text-7xl lg:text-8xl">{next.shortTitle}</h2>
            <div className="relative aspect-video overflow-hidden rounded-[4px]">
              <Image alt={`${next.client} - ${next.shortTitle}`} className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" fill sizes="(max-width: 1024px) calc(100vw - 40px), 45vw" src={next.image} />
              <span className="btn btn-circle absolute bottom-4 right-4 border-0 bg-[#f3f1ea] text-[#050505]! shadow-none" aria-hidden="true"><ArrowUpRight size={18} /></span>
            </div>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm">Continue <ArrowRight size={16} aria-hidden="true" /></span>
        </Link>
      </section>
      <ContactBand />
    </main>
  );
}
