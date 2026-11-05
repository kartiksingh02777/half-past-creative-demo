import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactBand, PageEyebrow } from "@/components/site-chrome";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "The Studio & Project Stack",
  description: "The thinking, philosophy, and curated project stack by Half Past Creative.",
};

export default function StudioPage() {
  return (
    <main className="pt-16 lg:pt-20">
      <section className="bg-base-100 py-12 text-base-content lg:py-16">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <PageEyebrow index="03">The studio</PageEyebrow>
          <h1 className="display-font max-w-[1350px] text-6xl leading-[0.84] sm:text-8xl lg:text-[9rem]" data-intro>Clear thinking. <span className="editorial-font font-normal italic text-base-content/50">Powerful delivery.</span></h1>
          <div className="mt-14 grid gap-5 sm:grid-cols-[0.8fr_1.2fr] lg:mt-20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px]" data-media-reveal>
              <Image alt="Toyota Ebella EV launch" className="object-cover" data-parallax="-6" fill priority sizes="40vw" src="/work/ebella.jpg" />
            </div>
            <div className="relative mt-16 aspect-video overflow-hidden rounded-[4px] sm:mt-28" data-media-reveal>
              <Image alt="TVS Apache post-production campaign" className="object-cover object-[58%_center]" data-parallax="6" fill priority sizes="60vw" src="/work/apache.jpg" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100 py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.65fr_1.35fr] lg:px-12" data-reveal>
          <div>
            <p className="text-xs uppercase text-accent">The approach</p>
            <p className="display-font mt-8 text-7xl leading-none sm:text-8xl">22<span className="text-accent">+</span></p>
            <p className="mt-3 text-sm text-base-content/50">Years building brands that move</p>
          </div>
          <div className="space-y-8 text-xl leading-9 text-base-content/65 sm:text-2xl sm:leading-10">
            <p>Half Past Creative is a media and marketing consultancy defined by clarity of thought and strength of execution. We bring together strategy, storytelling, and delivery to shape ideas into purposeful brand experiences — across content, campaigns, and digital platforms.</p>
            <p>With over two decades working alongside brands, agencies, and creators, we understand what it takes to move ideas from concept to impact. Because creativity isn't just about ideas — it's about putting them into motion and making them work.</p>
          </div>
        </div>
      </section>

      <section className="bg-base-100 py-24 text-base-content lg:py-32" id="project-stack">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="mb-14 grid gap-8 border-b border-base-content/15 pb-12 lg:grid-cols-[0.55fr_1.45fr]" data-reveal>
            <div>
              <p className="text-xs uppercase text-accent">Selected Work</p>
              <h2 className="display-font mt-4 text-5xl leading-[0.95] sm:text-7xl">Project Stack</h2>
            </div>
            <p className="self-end text-lg leading-8 text-base-content/65">
              Multiple projects in a continuous vertical stack &mdash; from commercial film and CGI to sonic identities and motion packaging.
            </p>
          </div>

          <div className="border-t border-base-content/15">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="group border-b border-base-content/15 py-10 transition-colors hover:bg-base-content/[0.02] lg:py-14"
                data-reveal
              >
                <div className="grid gap-6 lg:grid-cols-[60px_220px_1fr_auto] lg:items-center">
                  <span className="font-mono text-sm text-accent">{project.number}</span>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-base-300">
                    <Image
                      src={project.image}
                      alt={`${project.client} - ${project.shortTitle}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 220px"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-base-content/50">
                      <span>{project.client}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                      <span>•</span>
                      <span className="rounded-full border border-base-content/20 px-2.5 py-0.5 text-[11px] text-base-content/70">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="display-font mt-3 text-3xl sm:text-4xl">
                      {project.client} &mdash; {project.shortTitle}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-base-content/65">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-2 lg:mt-0">
                    <Link
                      href={`/work/${project.slug}`}
                      className="group/link inline-flex items-center gap-2 rounded-full border border-base-content/25 px-5 py-3 text-sm font-medium transition-colors hover:border-base-content hover:bg-base-content hover:text-base-100"
                    >
                      <span>View Project</span>
                      <ArrowUpRight size={16} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
