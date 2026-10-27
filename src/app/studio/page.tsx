import type { Metadata } from "next";
import Image from "next/image";
import { ContactBand, PageEyebrow } from "@/components/site-chrome";
import { process, services } from "@/data/site";

export const metadata: Metadata = {
  title: "The Studio",
  description: "The thinking, process, and production philosophy behind Half Past Creative.",
};

const principles = [
  ["Clarity", "Find the real problem and make the answer easy to understand."],
  ["Craft", "Treat every frame, word, sound, and handoff as part of one experience."],
  ["Consideration", "Work closely, listen properly, and protect the ambition behind the brief."],
  ["Continuous growth", "Use every launch, result, and new tool to make the next idea stronger."],
];

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

      <section className="bg-[#f3f1ea] py-24 text-[#050505] lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 border-b border-black/20 pb-14 lg:grid-cols-[220px_1fr]" data-reveal>
            <p className="text-xs uppercase text-black/50">How we work</p>
            <h2 className="display-font text-5xl leading-[0.95] sm:text-7xl">From thinking to motion.</h2>
          </div>
          <div>
            {process.map(([number, phase, title, body]) => (
              <article className="grid gap-5 border-b border-black/20 py-9 sm:grid-cols-[80px_0.7fr_1.3fr] sm:items-start lg:py-12" data-reveal key={number}>
                <span className="text-xs text-black/40">{number}</span>
                <div><p className="text-xs uppercase text-black/45">{phase}</p><h3 className="display-font mt-2 text-3xl sm:text-4xl">{title}</h3></div>
                <p className="max-w-xl text-lg leading-8 text-black/55">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-200 py-24 text-base-content lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 border-b border-base-content/15 pb-14 lg:grid-cols-[220px_1fr]" data-reveal>
            <p className="text-xs uppercase text-base-content/45">Studio principles</p>
            <h2 className="display-font text-5xl leading-[0.95] sm:text-7xl">What stays constant while everything else moves.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(([name, body], index) => (
              <article className="border-b border-base-content/15 py-8 sm:border-r sm:px-6 first:pl-0 last:border-r-0 lg:min-h-64 lg:py-10" data-reveal key={name}>
                <span className="text-xs text-base-content/35">0{index + 1}</span>
                <h3 className="display-font mt-10 text-3xl">{name}</h3>
                <p className="mt-5 leading-7 text-base-content/55">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap gap-x-7 gap-y-4 border-t border-base-content/15 pt-7 text-sm text-base-content/50" data-reveal>
            {services.map((service) => <span key={service.number}>{service.name}</span>)}
          </div>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
