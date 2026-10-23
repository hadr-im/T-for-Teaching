import salah from "../images/salah.png";

/* ─── EVENT ────────────────────────────────────────────────────────────────
   Single source of truth for anything that appears in more than one place,
   so the hero, the marquee and the footer can never disagree.

   ⚠ TODO — confirm before launch:
     · deadlineISO / dateLabel are placeholders, not a real event date
     · `program` assumes Global Volunteer; check which AIESEC product
       T for Teaching actually sits under
   ───────────────────────────────────────────────────────────────────────── */

export const event = {
  name: "T for Teaching",
  edition: "",
  program: "AIESEC Global Volunteer",
  deadlineISO: "2027-03-13T09:00:00",
  dateLabel: "13 MAR 2027",
  dateNumeric: "13.03.2027",
  origin: "TUNIS",
  city: "Tunis, Tunisia",
  tagline:
    "A teaching exchange by AIESEC placing young people in classrooms abroad — six to ten weeks in front of a real class, with training, a host family and a certificate.",
};

/* ─── DESTINATIONS ─────────────────────────────────────────────────────────
   Pins on the hero globe and lessons on the chalkboard: where this
   programme can place you, and what you would be teaching.
   `coords` is [latitude, longitude] of each host city.
   ───────────────────────────────────────────────────────────────────────── */

export const destinations = [
  { city: "MOROCCO",   code: "MAR", coords: [33.57, -7.59],   subject: "English",        level: "Primary",   weeks: "6 weeks",  status: "open" },
  { city: "VIETNAM",   code: "VNM", coords: [21.03, 105.85],  subject: "English",        level: "Secondary", weeks: "8 weeks",  status: "open" },
  { city: "TURKIYE",   code: "TUR", coords: [41.01, 28.98],   subject: "English",        level: "Primary",   weeks: "6 weeks",  status: "filling" },
  { city: "EGYPT",     code: "EGY", coords: [30.04, 31.24],   subject: "French",         level: "Secondary", weeks: "6 weeks",  status: "open" },
  { city: "INDIA",     code: "IND", coords: [28.61, 77.21],   subject: "Mathematics",    level: "Primary",   weeks: "8 weeks",  status: "open" },
  { city: "INDONESIA", code: "IDN", coords: [-6.21, 106.85],  subject: "English",        level: "Primary",   weeks: "7 weeks",  status: "filling" },
  { city: "GHANA",     code: "GHA", coords: [5.6, -0.19],     subject: "Digital Skills", level: "Secondary", weeks: "8 weeks",  status: "open" },
  { city: "BRAZIL",    code: "BRA", coords: [-23.55, -46.63], subject: "English",        level: "Community", weeks: "10 weeks", status: "open" },
  { city: "ROMANIA",   code: "ROU", coords: [44.43, 26.1],    subject: "Science",        level: "Secondary", weeks: "6 weeks",  status: "open" },
  { city: "SRI LANKA", code: "LKA", coords: [6.93, 79.86],    subject: "English",        level: "Primary",   weeks: "8 weeks",  status: "filling" },
];

export const origin = { city: "TUNIS", coords: [36.8, 10.18] };

const ARC_COLORS = ["#FEB13E", "#FD9A01", "#FFC66B", "#C87A02"];

/* Wider AIESEC network, shown on the globe only.
   These are NOT open placements, so they stay off the chalkboard — that
   lists lessons you can actually apply to. They exist to give the globe
   more connected countries without inventing vacancies. */
export const networkNodes = [
  { city: "NEPAL",       coords: [27.72, 85.32] },
  { city: "PHILIPPINES", coords: [14.6, 120.98] },
  { city: "COLOMBIA",    coords: [4.71, -74.07] },
  { city: "PERU",        coords: [-12.05, -77.04] },
  { city: "KENYA",       coords: [-1.29, 36.82] },
  { city: "POLAND",      coords: [52.23, 21.01] },
];

export const globePoints = [
  { lat: origin.coords[0], lng: origin.coords[1], size: 0.7, color: "#FFFFFF" },
  ...destinations.map((d) => ({ lat: d.coords[0], lng: d.coords[1], size: 0.45, color: "#FEB13E" })),
  // Network nodes sit dimmer and smaller than bookable placements.
  ...networkNodes.map((n) => ({ lat: n.coords[0], lng: n.coords[1], size: 0.3, color: "#9A6400" })),
];

/* Hub and spoke out of Tunis — the arcs are the story: these are the
   classrooms this programme can put you in front of. Cross-links keep the
   far side of the globe from looking empty as it rotates. */
const CROSS_LINKS = [
  ["MOROCCO", "BRAZIL"],
  ["VIETNAM", "INDIA"],
  ["ROMANIA", "TURKIYE"],
  ["EGYPT", "GHANA"],
];

const byCity = (city) => destinations.find((d) => d.city === city);

const arcFrom = (from, to, order, alt, colorIndex) => ({
  order,
  startLat: from[0],
  startLng: from[1],
  endLat: to[0],
  endLng: to[1],
  arcAlt: alt,
  color: ARC_COLORS[colorIndex % ARC_COLORS.length],
});

export const globeArcs = [
  ...destinations.map((d, i) => arcFrom(origin.coords, d.coords, i, 0.14 + (i % 4) * 0.07, i)),
  ...CROSS_LINKS.map(([a, b], i) =>
    arcFrom(byCity(a).coords, byCity(b).coords, destinations.length + i, 0.26 + i * 0.05, i + 2)
  ),
  ...networkNodes.map((n, i) =>
    arcFrom(origin.coords, n.coords, destinations.length + CROSS_LINKS.length + i, 0.18 + (i % 3) * 0.09, i + 1)
  ),
];

/* ─── WHY TEACH ────────────────────────────────────────────────────────────── */

export const whyAttend = [
  {
    title: "Run Your Own Class",
    desc: "Not shadowing, not assisting. You plan the lessons and stand in front of a real class from your first week.",
  },
  {
    title: "Training First",
    desc: "Lesson planning, classroom management and teaching English as a foreign language — before you ever face a room.",
  },
  {
    title: "Live With A Host",
    desc: "Accommodation with a host family or partner school, so you live the language instead of visiting it.",
  },
  {
    title: "Certified Practice",
    desc: "Finish with a recognised certificate of teaching practice — something a CV can actually point at.",
  },
  {
    title: "A Second Language",
    desc: "Six to ten weeks surrounded by a language you don't speak does more than a year of evening classes.",
  },
  {
    title: "Mentorship Throughout",
    desc: "A local AIESEC team and a school supervisor on the ground with you for the whole placement.",
  },
];

/* ─── PROJECT LEAD ─────────────────────────────────────────────────────────
   ⚠ TODO — only the photo is confirmed. The surname, phone and email
   here were Aymen's (the Linked Out lead); they have been cleared rather
   than shown against a different face. The contact rows stay hidden
   while they are empty, so fill them in before launch.
   ───────────────────────────────────────────────────────────────────────── */

export const crew = [
  {
    id: "salah",
    name: "Salah",
    role: "Project Head",
    initials: "S",
    photo: salah,
    phone: "",
    email: "",
    country: "Tunisia",
    bio: "Salah leads T for Teaching end to end — from the schools hosting our volunteers to the people who will be standing in front of those classes. If you have a question the site does not answer, he is the one to ask.",
  },
];

/* ─── PLACEMENTS ───────────────────────────────────────────────────────────── */

export const opportunities = [
  {
    id: 1,
    code: "MAR",
    title: "Teach English — Primary School",
    org: "AIESEC in Morocco",
    duration: "6 weeks",
    type: "Global Volunteer",
    deadline: "30 JAN 2027",
    tags: ["English", "Primary", "Host family"],
  },
  {
    id: 2,
    code: "VNM",
    title: "English Conversation Classes",
    org: "AIESEC in Vietnam",
    duration: "8 weeks",
    type: "Global Volunteer",
    deadline: "10 FEB 2027",
    tags: ["English", "Secondary", "Certified"],
  },
  {
    id: 3,
    code: "IND",
    title: "Maths & Numeracy Support",
    org: "AIESEC in India",
    duration: "8 weeks",
    type: "Global Volunteer",
    deadline: "01 FEB 2027",
    tags: ["Mathematics", "Primary", "Training"],
  },
  {
    id: 4,
    code: "GHA",
    title: "Digital Skills in the Classroom",
    org: "AIESEC in Ghana",
    duration: "8 weeks",
    type: "Global Volunteer",
    deadline: "25 JAN 2027",
    tags: ["Digital", "Secondary", "Stipend"],
  },
  {
    id: 5,
    code: "ROU",
    title: "Science Club Facilitator",
    org: "AIESEC in Romania",
    duration: "6 weeks",
    type: "Global Volunteer",
    deadline: "15 FEB 2027",
    tags: ["Science", "Secondary", "Europe"],
  },
  {
    id: 6,
    code: "BRA",
    title: "Community English Project",
    org: "AIESEC in Brazil",
    duration: "10 weeks",
    type: "Global Volunteer",
    deadline: "01 MAR 2027",
    tags: ["English", "Community", "Impact"],
  },
];

/* ─── MARQUEE ──────────────────────────────────────────────────────────────
   ⚠ PLACEHOLDER FIGURES — replace with the real numbers. Everything that
   displays them reads from here.
   ───────────────────────────────────────────────────────────────────────── */

export const marqueeRows = [
  ["10+ COUNTRIES", "REAL CLASSROOMS", "HOST FAMILY", "100+ ALUMNI"],
  ["AGED 18–30", "6–10 WEEKS", "TRAINING INCLUDED", "6 SUBJECTS"],
  ["LESSON PLANNING", "CERTIFICATE", "LOCAL MENTOR", "NO EXPERIENCE NEEDED"],
];

/* ─── NAV + FOOTER ─────────────────────────────────────────────────────────── */

export const navLinks = [
  { label: "Why Teach",    href: "#why" },
  { label: "Project Lead", href: "#lead" },
  { label: "Placements",   href: "#opportunities" },
];

export const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/aiesechadrumet",
  },
];
