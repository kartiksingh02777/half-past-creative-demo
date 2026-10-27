"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { contact, services } from "@/data/site";

const navLinks = [
  ["Work", "/work"],
  ["Services", "/services"],
  ["Studio", "/studio"],
  ["Contact", "/contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[70] border-b border-base-content/10 bg-base-100/88 backdrop-blur-xl">
      <div className="navbar mx-auto min-h-16 max-w-[1600px] px-4 sm:px-8 lg:min-h-20 lg:px-12">
        <div className="navbar-start">
          <Link className="group flex items-center gap-3" href="/" aria-label="Half Past Creative home" onClick={() => setOpen(false)} scroll={false}>
            <BrandMark className="h-9 w-8 shrink-0 transition-transform duration-500 group-hover:rotate-6 lg:h-11 lg:w-9" />
            <span className="display-font text-xl leading-none text-base-content lg:text-2xl">Half Past Creative</span>
          </Link>
        </div>

        <nav className="navbar-center hidden gap-8 lg:flex" aria-label="Primary navigation">
          {navLinks.map(([label, href]) => {
            const active = pathname === href || (href === "/work" && pathname.startsWith("/work/"));
            return (
              <Link
                className={`nav-link text-sm ${active ? "text-base-content" : "text-base-content/55"}`}
                href={href}
                key={href}
                scroll={false}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="navbar-end gap-2">
          <Link className="btn btn-sm hidden rounded-field border-base-content/25 bg-transparent text-base-content shadow-none hover:border-accent hover:bg-accent hover:text-accent-content lg:inline-flex" href="/contact" scroll={false}>
            Start a project <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
          <button
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="btn btn-circle btn-ghost text-base-content lg:hidden"
            onClick={() => setOpen((current) => !current)}
            title={open ? "Close menu" : "Open menu"}
            type="button"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 top-16 z-10 h-[calc(100svh-4rem)] overflow-y-auto bg-[#050505]! px-5 pb-8 pt-10 sm:top-20 sm:h-[calc(100svh-5rem)] sm:px-8 lg:hidden ${open ? "block" : "hidden"}`}>
        <nav aria-label="Mobile navigation">
          {navLinks.map(([label, href], index) => (
            <Link className="flex items-center justify-between border-b border-base-content/15 py-5 display-font text-4xl" href={href} key={href} onClick={() => setOpen(false)} scroll={false}>
              <span><span className="mr-4 align-middle font-sans text-xs text-base-content/45">0{index + 1}</span>{label}</span>
              <ArrowUpRight aria-hidden="true" size={24} strokeWidth={1.5} />
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-8 left-5 right-5 flex items-end justify-between border-t border-base-content/15 pt-5 text-sm text-base-content/60 sm:left-8 sm:right-8">
          <span>Vashi, Navi Mumbai</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </header>
  );
}

export function ContactBand({ dark = false }: { dark?: boolean }) {
  return (
    <section className={dark ? "bg-base-100 text-base-content" : "bg-[#f3f1ea] text-[#050505]"}>
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32" data-reveal>
        <p className={`mb-9 text-xs uppercase ${dark ? "text-accent" : "text-black/55"}`}>Have an idea?</p>
        <Link className={`group flex items-end justify-between gap-6 border-b pb-7 ${dark ? "border-base-content/25" : "border-black/25"}`} href="/contact" scroll={false}>
          <span className="display-font max-w-6xl text-5xl leading-[0.9] sm:text-7xl lg:text-9xl">Let&apos;s put it into motion.</span>
          <ArrowUpRight className="mb-2 shrink-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" size={44} strokeWidth={1.35} aria-hidden="true" />
        </Link>
        <div className={`mt-8 flex flex-col justify-between gap-3 text-sm sm:flex-row ${dark ? "text-base-content/55" : "text-black/60"}`}>
          <span>{contact.email}</span>
          <span>Vashi, Navi Mumbai / India</span>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer footer-vertical bg-base-200 px-5 py-14 text-base-content/60 sm:footer-horizontal sm:px-8 lg:px-12">
      <aside className="max-w-sm">
        <Link className="mb-4 flex items-center gap-3 text-base-content" href="/" scroll={false}>
          <BrandMark className="h-10 w-9" />
          <span className="display-font text-2xl">Half Past Creative</span>
        </Link>
        <p className="leading-7">Where strategy meets storytelling. Ideas shaped with clarity and moved through craft.</p>
      </aside>
      <nav>
        <h3 className="footer-title text-base-content">Explore</h3>
        {navLinks.map(([label, href]) => <Link className="link link-hover" href={href} key={href} scroll={false}>{label}</Link>)}
      </nav>
      <nav>
        <h3 className="footer-title text-base-content">Capabilities</h3>
        {services.slice(0, 4).map((service) => <Link className="link link-hover" href="/services" key={service.number}>{service.name}</Link>)}
      </nav>
      <nav>
        <h3 className="footer-title text-base-content">Get in touch</h3>
        <a className="link link-hover" href={`mailto:${contact.email}`}>{contact.email}</a>
        <a className="link link-hover" href={contact.phoneHref}>{contact.phone}</a>
        <span className="max-w-60 leading-6">{contact.address}</span>
      </nav>
      <div className="col-span-full mt-6 flex w-full flex-col justify-between gap-2 border-t border-base-content/10 pt-6 text-xs sm:flex-row">
        <span>© 2026 Half Past Creative. All rights reserved.</span>
        <span>Website redesign concept</span>
      </div>
    </footer>
  );
}

export function PageEyebrow({ index, children, light = false }: { index: string; children: React.ReactNode; light?: boolean }) {
  return <p className={`mb-5 flex items-center gap-3 text-xs uppercase ${light ? "text-black/55" : "text-base-content/55"}`}><span className={light ? "text-black" : "text-accent"}>{index}</span>{children}</p>;
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="group inline-flex items-center gap-3 border-b border-current pb-1 text-sm" href={href}>
      {children}<ArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" size={17} />
    </Link>
  );
}
