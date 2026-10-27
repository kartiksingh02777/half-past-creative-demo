"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { contact } from "@/data/site";

export function ContactForm() {
  const [prepared, setPrepared] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Email: ${data.get("email")}`,
      `Project type: ${data.get("project")}`,
      "",
      String(data.get("brief") ?? ""),
    ].join("\n");
    const href = `mailto:${contact.email}?subject=${encodeURIComponent(`Project enquiry from ${data.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
    window.location.href = href;
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-base-content/70">Your name</legend>
          <input className="input input-lg w-full rounded-field border-base-content/20 bg-transparent focus:border-accent" name="name" placeholder="Name" required type="text" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-base-content/70">Work email</legend>
          <input className="input input-lg w-full rounded-field border-base-content/20 bg-transparent focus:border-accent" name="email" placeholder="name@company.com" required type="email" />
        </fieldset>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-base-content/70">Company</legend>
          <input className="input input-lg w-full rounded-field border-base-content/20 bg-transparent focus:border-accent" name="company" placeholder="Company or brand" type="text" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-base-content/70">Project type</legend>
          <input className="input input-lg w-full rounded-field border-base-content/20 bg-transparent focus:border-accent" name="project" placeholder="Film, CGI, branding..." type="text" />
        </fieldset>
      </div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-base-content/70">Tell us about the project</legend>
        <textarea className="textarea textarea-lg min-h-40 w-full rounded-field border-base-content/20 bg-transparent focus:border-accent" name="brief" placeholder="The idea, the audience, the timing, and what success looks like." required />
      </fieldset>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button className="btn btn-lg rounded-field border-0 bg-accent text-accent-content shadow-none hover:bg-[#f3f1ea] hover:text-[#050505]" type="submit">
          Prepare email <ArrowUpRight aria-hidden="true" size={18} />
        </button>
        <p className="text-sm text-base-content/50">This opens an email draft. Nothing is sent automatically.</p>
      </div>
      {prepared ? <p className="flex items-center gap-2 text-sm text-secondary"><Check size={16} aria-hidden="true" /> Email draft prepared.</p> : null}
    </form>
  );
}
