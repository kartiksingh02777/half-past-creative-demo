# Half Past Creative Design Direction

## Concept: Footage Becomes Space / V6.7

The website behaves like an editorial showreel. Large, quiet typography establishes confidence; verified campaign frames supply energy; scroll becomes the edit between ideas, craft, and outcomes.

## Identity

- Preserve the existing three-colour brand mark
- Ink `#050505`, paper `#f5f1e8`, quiet grey `#a7a39b`, signal sky `#82c9e0`, and action coral `#d65b4c`
- Geist carries navigation and precise information; Instrument Serif appears only in high-value editorial phrases and the Polychromos chapter title
- Square or 4px controls and media edges; no decorative floating cards

## Layout

- Full-bleed Apache hero with a 165-frame desktop sequence and a lightweight mobile fallback
- Overlapping `Projects in Motion` film panels using four distinct campaign previews
- Full-bleed Polychromos material study built from six footage-derived CSS-3D media planes over the same Sentinel architectural depth used in Projects
- Off-white editorial service list beside one pinned Ebella proof film
- Direct black contact close with no decorative panel or invented proof copy
- Portfolio index uses numbered editorial filters and project rows with varied image scale
- Project pages use one hero image, a compact facts band, and large process statements

## Motion

- Lenis supplies inertial page scrolling and stays synchronized with GSAP ScrollTrigger
- Apache frames scrub from 001-165 over a 620svh desktop section, beginning at the verified 39-second key-placement shot; RAF interpolation and eased ScrollTrigger progress remove frame stepping
- Mobile uses the optimized 6.6-second clip as paused media; a 540svh ScrollTrigger seeks its current time, so it never autoplays or outruns the user
- Hero typography runs as four cinematic scroll chapters: ideas, strategy, film craft, and music; compact bordered panels sit below the faces and exit with blur/lift before the next left-right statement enters
- Projects occupy a 560svh pinned chapter: Apache, Polychromos, One Aero, and Ebella each receive a dedicated full-opacity hold before the next film enters
- Project video uses `object-contain` in a true 16:9 stage with a separate caption band, so the complete campaign frame stays visible
- Projects keep the four sequential film holds while the exact cursor-responsive Sentinel Spline scene supplies the architectural depth; extra side boxes, rails, and number indicators are removed
- Project card centering lives on a stable wrapper, so responsive breakpoint changes cannot leave stale GSAP pixel translations on active cards
- GSAP moves six Polychromos footage planes through a CSS-3D perspective field; the iridescent orb, dotted corridor, point sculpture, and halo line are removed
- GSAP staggers the material-study title; all production copy stays readable HTML while the project depth language continues behind the footage planes
- Ebella uses a dedicated 1920x1080 web encode with `object-contain`, so the full 16:9 frame stays sharp without forced zoom
- The final project CTA keeps one crisp HTML headline and adds localized pointer-driven word distortion plus a linear liquid-light sweep; no circles or duplicate text layers are rendered
- A top progress line reports page position
- Reduced-motion and mobile users receive the complete static reading order
- Section eyebrows are descriptive only; numeric `01/` to `04/` prefixes are removed

## Polish And Safety

- Global text rendering uses antialiasing, geometric kerning, and no synthesized font faces
- Desktop and mobile layouts maintain zero horizontal overflow
- Global response headers deny camera, microphone, and geolocation access, prevent MIME sniffing and iframe embedding, and apply a strict referrer policy
- CSP is intentionally deferred because the approved external Spline runtime needs a tested production allowlist
- `output: export` creates a complete static `out/` folder with clean trailing-slash routes and a Netlify `_headers` file

## Content Rules

- Use only verified public Half Past Creative work and contact information
- Generated storyboard text is not production copy; all production text remains selectable HTML
- Do not show `0+` metrics from the current website
- Do not invent results, awards, team members, social links, or project URLs
- Use `Unknown` in internal records for any unverified business facts
