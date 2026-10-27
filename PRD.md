# Half Past Creative Website Redesign

## Objective

Create a complete, cinematic portfolio website for Half Past Creative that makes the studio's real work the primary sales proof and gives prospects clear routes to understand capabilities, review case studies, and start a conversation.

## Audience

- Brand and marketing decision-makers
- Agencies seeking production and post-production partners
- Founders and teams commissioning campaigns, films, motion, music, or CGI

## Site Map

- `/` - brand-led homepage, featured work, capabilities, process, testimonials, contact CTA
- `/work` - complete portfolio index with category filters
- `/work/[slug]` - four individual project stories
- `/services` - seven capabilities with deliverables and working model
- `/studio` - positioning, experience, process, and principles
- `/contact` - contact details and an email-draft project form

## Approved V6 Direction

- Scene 1: a pinned Apache frame sequence controlled by scroll. The foreground subject/device and oversized wordmark create a restrained depth mask rather than a video-player treatment.
- Scene 2: the hero closes through a foreground match cut into the work catalog.
- Scene 3: preserve the client-liked `Projects in Motion` concept as four overlapping film panels with real muted footage previews. The selected Polychromos panel expands into the next scene.
- Scene 4: replace the One Aero spray-can chapter with a full-bleed Polychromos chromatic frame tunnel. Three.js controls media planes and camera depth; Anime.js handles the drawn colour path and local type choreography; GSAP ScrollTrigger remains the single scroll timeline owner.
- Scene 5: a paper match cut opens an editorial service list beside one pinned Ebella proof film, then resolves to the project-start close.
- Each campaign has one primary homepage role: Apache hero, Polychromos spatial chapter, Ebella proof close, and One Aero catalog preview. Full-size media does not repeat.
- The approved visual contract is `output/previews/half-past-v6-footage-storyboard.png`.
- No reference site's source, paid template, assets, copy, or claimed results are copied; motion principles are implemented with verified Half Past Creative footage and original code.

## Functional Scope

- Responsive persistent navigation and full mobile menu
- GSAP entrance, pinned hero frame scrub, project-card stack, spatial chapter camera, service pinning, and progress motion
- Three.js media-plane scene with a non-WebGL and reduced-motion fallback
- Anime.js path/type choreography scoped to the Polychromos chapter
- Four verified public project visuals and four supplied local source videos
- Work filtering and project detail navigation
- Accessible contact form that opens a pre-filled email draft; it never sends automatically
- SEO metadata, reduced-motion support, keyboard navigation, and responsive image delivery

## Boundaries

- Social URLs remain omitted until official profiles are verified
- CMS, analytics, hosting, domains, and form backend are not connected in this local concept
- No deployment or client sharing without Kartik's explicit approval
- No unverified campaign results, metrics, or client claims

## Success Criteria

- Every navigation item leads to a complete page or verified destination
- Real work appears in the first viewport and throughout the experience
- Desktop and mobile layouts have no text collisions or horizontal overflow
- Motion supports storytelling without blocking reading or navigation
- Mobile receives a complete natural reading order instead of fragile pinned effects
- Desktop uses optimized footage-derived sequences and previews; mobile uses lightweight video/still fallbacks
- Contact flow requires a deliberate user action and never sends automatically
- Production build and lint pass
