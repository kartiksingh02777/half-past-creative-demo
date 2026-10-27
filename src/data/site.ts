export type Project = {
  slug: string;
  number: string;
  client: string;
  title: string;
  shortTitle: string;
  year: string;
  category: "Film" | "CGI" | "Music";
  discipline: string;
  description: string;
  overview: string;
  craft: string[];
  image: string;
  video?: string;
  accent: string;
  accentText: string;
};

export const projects: Project[] = [
  {
    slug: "apache-built-to-order",
    number: "01",
    client: "TVS Apache",
    title: "Apache RR310 & RTR310 - Built to Order",
    shortTitle: "Built to Order",
    year: "2025",
    category: "Film",
    discipline: "Post-production / Sound / Finishing",
    description: "Complete post-production from script stage to final master. Unified edit, sound, colour and finishing to preserve the precision of a futuristic tech lab meeting high-speed track performance.",
    overview: "Half Past Creative shaped the complete post-production journey from script stage to final master, keeping every cut, sound cue, grade, and finish aligned with the machines' engineered precision.",
    craft: ["Edit and narrative rhythm", "Sound design", "Colour and finishing"],
    image: "/work/apache.jpg",
    video: "https://www.youtube.com/watch?v=Lii2r4LSA-U",
    accent: "#7f2a3a",
    accentText: "#f4efe7",
  },
  {
    slug: "polychromos-evoking-emotion",
    number: "02",
    client: "Faber-Castell",
    title: "Polychromos - Evoking Emotion",
    shortTitle: "Evoking Emotion",
    year: "2025",
    category: "CGI",
    discipline: "CGI / Art direction / Product film",
    description: "A fully CGI tribute to craftsmanship. Every pencil meticulously modelled and rendered to highlight material richness, precision, and the iconic detailing of collector-grade instruments.",
    overview: "A fully CGI product story built around the tactile richness of Polychromos. Every pencil, surface, and transition was developed to make precision feel emotional rather than technical.",
    craft: ["CGI production", "Material and lighting", "Product storytelling"],
    image: "/work/polychromos.jpg",
    video: "https://www.youtube.com/watch?v=wgJBTSN1mlA",
    accent: "#98c3e3",
    accentText: "#0b0a09",
  },
  {
    slug: "one-aero-aerosol-mastery",
    number: "03",
    client: "Birla Opus",
    title: "One Aero - Aerosol Mastery",
    shortTitle: "Aerosol Mastery",
    year: "2025",
    category: "CGI",
    discipline: "CGI / Motion / Product visualisation",
    description: "Entirely crafted in CGI. Every spray burst, surface, and colour transition rendered with meticulous detail to reflect the innovation and finish of the new paint spray range.",
    overview: "Every spray burst, surface, and colour transition was rendered to explain the product while preserving a premium sense of finish and control.",
    craft: ["3D product build", "Motion direction", "Look development"],
    image: "/work/one-aero.jpg",
    video: "https://www.youtube.com/watch?v=IPS8jStC53I",
    accent: "#d29979",
    accentText: "#0b0a09",
  },
  {
    slug: "ebella-ev-launch-music",
    number: "04",
    client: "Toyota",
    title: "Ebella EV - Launch Music x Drum Tao",
    shortTitle: "Launch in Rhythm",
    year: "2024",
    category: "Music",
    discipline: "Original music / Live collaboration / Launch",
    description: "A launch composition built around a collaboration with Japanese percussionists Drum Tao — their drums, percussions, and flutes playing live to the original track.",
    overview: "The launch score brought drums, percussion, and flutes into a live performance built around the original track, giving the vehicle reveal a distinct sense of scale and momentum.",
    craft: ["Original composition", "Live performance direction", "Launch experience"],
    image: "/work/ebella.jpg",
    accent: "#7f2a3a",
    accentText: "#f4efe7",
  },
  {
    slug: "birla-studios-logo-animation",
    number: "05",
    client: "Birla Studios",
    title: "Birla Studios - Logo Animation 15 Sec Master",
    shortTitle: "Logo Animation",
    year: "2025",
    category: "CGI",
    discipline: "CGI / 3D Animation / Logo Identity",
    description: "The Birla Studios Logo Animation done completely in CGI. Dynamic camera moves, metallic shader look-dev, and precision sound design engineered for cinematic impact.",
    overview: "Crafted entirely in CGI, the Birla Studios emblem takes form through polished bronze curves and geometric motion, establishing a bold, high-fidelity studio identity.",
    craft: ["CGI production", "3D Look development", "Motion and finishing"],
    image: "/work/birla-studios.jpg",
    video: "https://youtu.be/ctf6M0IDFYk",
    accent: "#c2713d",
    accentText: "#f4efe7",
  },
];

export const services = [
  { number: "01", name: "Branding", summary: "Clear identities built to stay coherent as the business grows.", deliverables: ["Positioning", "Messaging", "Visual systems", "Brand rollout"] },
  { number: "02", name: "Marketing Strategy", summary: "Insight-led plans aligned with audiences, channels, and business goals.", deliverables: ["Audience insight", "Campaign planning", "Channel strategy", "Measurement framework"] },
  { number: "03", name: "TV Commercials & Digital Ads", summary: "From creative concepts and scripting through full production and post — ads that convert and captivate.", deliverables: ["Concept and script", "Production", "Post-production", "Campaign masters"] },
  { number: "04", name: "Music Production & Dubbing", summary: "Original music from our network of producers. A battery of voice artists, Indian and foreign languages.", deliverables: ["Composition", "Sound design", "Voice casting", "Multilingual dubbing"] },
  { number: "05", name: "Corporate Film & Storytelling", summary: "Brand stories, product launches, and training films — authentic narratives, crafted from concept to final cut.", deliverables: ["Narrative development", "Brand films", "Product launches", "Training content"] },
  { number: "06", name: "Animation & Motion Graphics", summary: "Explainers, animated infographics, 2D & 3D VFX, product visualisation — making complex ideas simple and engaging.", deliverables: ["2D animation", "3D and CGI", "VFX", "Product visualisation"] },
  { number: "07", name: "AI-Led Creative Production", summary: "AI used thoughtfully — from concept exploration to visual execution — while maintaining craft, control, and brand integrity.", deliverables: ["Concept exploration", "Visual development", "Rapid prototyping", "Creative production"] },
];

export const process = [
  ["01", "Discover", "Listen & define", "Understand the business, audience, ambition, and the real problem before proposing an answer."],
  ["02", "Shape", "Strategy & story", "Turn insight into positioning, narrative, and a creative platform designed for the channels that matter."],
  ["03", "Craft", "Produce & polish", "Bring film, music, animation, and motion together with every frame and every word considered."],
  ["04", "Move", "Launch & learn", "Deliver across platforms and use performance and feedback to strengthen what comes next."],
] as const;

export const testimonials = [
  { quote: "Their strategic thinking and creative execution delivered beyond our expectations - a partner that truly understands the vision.", name: "Rajesh Mehta", role: "Marketing Director" },
  { quote: "The team brought our brand film to life in a powerful way. Their storytelling ability and attention to detail stood out.", name: "A. Sharma", role: "Brand Manager" },
  { quote: "The digital campaign and TVC were visually strong, focused, and connected to the business goal.", name: "Anil Kapoor", role: "Creative Director" },
  { quote: "They understood the brief and delivered the music production and dubbing with absolute professionalism.", name: "Gomatica Fernandes", role: "Production Lead" },
];

export const contact = {
  email: "hello@halfpastcreative.com",
  phone: "+91 98675 01280",
  phoneHref: "tel:+919867501280",
  address: "Studio H1, 24 Sector 29, Vashi, Navi Mumbai - 400703",
};
