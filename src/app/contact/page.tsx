import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageEyebrow } from "@/components/site-chrome";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Start a conversation with Half Past Creative in Vashi, Navi Mumbai.",
};

export default function ContactPage() {
  return (
    <main className="pt-16 lg:pt-20">
      <section className="bg-base-100 py-12 lg:py-16">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <PageEyebrow index="04">Contact / Start a project</PageEyebrow>
          <h1 className="display-font max-w-[1300px] text-6xl leading-[0.84] sm:text-8xl lg:text-[9rem]" data-intro>Bring the idea. <span className="editorial-font font-normal italic text-base-content/55">We&apos;ll find the motion.</span></h1>
          <div className="mt-14 grid gap-10 border-t border-base-content/20 pt-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <aside data-reveal>
              <p className="max-w-md text-lg leading-8 text-base-content/65">Share the ambition, audience, timing, and where the idea needs to go. The form prepares an email draft for your review.</p>
              <div className="mt-12 space-y-7 text-sm">
                <a className="group flex items-start gap-4" href={`mailto:${contact.email}`}><Mail className="mt-0.5 text-accent" size={18} aria-hidden="true" /><span><span className="block text-base-content/40">Email</span><span className="mt-1 block group-hover:text-accent">{contact.email}</span></span></a>
                <a className="group flex items-start gap-4" href={contact.phoneHref}><Phone className="mt-0.5 text-accent" size={18} aria-hidden="true" /><span><span className="block text-base-content/40">Phone</span><span className="mt-1 block group-hover:text-accent">{contact.phone}</span></span></a>
                <div className="flex items-start gap-4"><MapPin className="mt-0.5 shrink-0 text-accent" size={18} aria-hidden="true" /><span><span className="block text-base-content/40">Studio</span><span className="mt-1 block max-w-xs leading-6">{contact.address}</span></span></div>
              </div>
            </aside>
            <div data-reveal><ContactForm /></div>
          </div>
        </div>
      </section>

      <section className="border-t border-base-content/10 bg-base-200 py-20 text-base-content lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-12" data-reveal>
          <p className="text-xs uppercase text-base-content/40">Based in Vashi</p>
          <div>
            <p className="display-font max-w-4xl text-5xl leading-[0.95] sm:text-7xl">Mumbai thinking, built for stories that travel.</p>
            <div className="mt-12 grid gap-8 border-t border-base-content/15 pt-7 text-sm sm:grid-cols-3">
              <div><span className="text-base-content/35">Office</span><p className="mt-2">Vashi, Navi Mumbai</p></div>
              <div><span className="text-base-content/35">Time zone</span><p className="mt-2">IST / UTC +5:30</p></div>
              <div><span className="text-base-content/35">Collaborations</span><p className="mt-2">India and international</p></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
