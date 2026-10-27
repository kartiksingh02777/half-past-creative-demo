const partners = ["TVS Motor", "Faber-Castell", "Birla Opus", "Birla Studios", "Toyota", "Drum Tao"];

const principles = [
  ["Mission", "Make complex ideas clear, memorable, and ready to move."],
  ["Vision", "Bring strategy and production into one connected creative practice."],
  ["Values", "Clarity in thinking. Strength in delivery."],
] as const;

export function CredibilityStage() {
  return (
    <section className="bg-[#f3f1ea] text-[#050505]" id="brand-story" aria-labelledby="brand-story-title">
      <div className="border-y border-black/15 py-5" aria-label="Selected partners">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center gap-x-10 gap-y-3 px-5 text-[10px] uppercase sm:px-8 sm:text-xs lg:justify-between lg:px-12">
          <span className="text-black/45">Selected partners</span>
          {partners.map((partner) => <span key={partner}>{partner}</span>)}
        </div>
      </div>

      <div className="mx-auto max-w-[1800px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div data-reveal>
            <p className="text-xs uppercase text-black/45">The thinking</p>
            <p className="mt-16 max-w-md text-lg leading-8 text-black/60">Half Past Creative brings strategy, storytelling, production, sound, and finishing into one deliberate creative process.</p>
          </div>
          <h2 id="brand-story-title" className="text-[3.6rem] font-semibold uppercase leading-[0.82] sm:text-[5.4rem] lg:text-[7.5rem] xl:text-[9rem]" data-reveal>
            <span className="block">Clarity in</span>
            <span className="block">thinking.</span>
            <span className="editorial-font block normal-case italic text-black/55">Strength in delivery.</span>
          </h2>
        </div>

        <div className="mt-24 grid border-y border-black/20 sm:grid-cols-3 lg:mt-32">
          {[
            ["22+", "Years of practice"],
            ["07", "Connected capabilities"],
            ["05", "Featured campaign stories"],
          ].map(([value, label]) => (
            <div className="stat rounded-none border-b border-black/20 bg-transparent px-0 py-8 shadow-none sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0" data-reveal key={label}>
              <div className="stat-value text-5xl font-semibold text-black sm:text-6xl">{value}</div>
              <div className="stat-desc mt-3 text-xs uppercase text-black/45">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-black/20">
        {principles.map(([label, body], index) => (
          <article className="grid border-b border-black/20 px-5 py-8 sm:px-8 lg:grid-cols-[220px_1fr_80px] lg:items-center lg:px-12 lg:py-10" data-reveal key={label}>
            <p className="text-xs uppercase text-black/45">0{index + 1} / {label}</p>
            <h3 className="mt-5 max-w-5xl text-3xl font-semibold leading-tight sm:text-4xl lg:mt-0 lg:text-5xl">{body}</h3>
            <span className="mt-5 text-right text-xs text-black/35 lg:mt-0" aria-hidden="true">HPC</span>
          </article>
        ))}
      </div>
    </section>
  );
}
