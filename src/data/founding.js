import { SCISUMMARY_URL, PREVIEWS } from './links';

// Copy for /founding-designer (pages/FoundingDesignerPage.js). A first draft,
// 2026-11-20, from the "Co-founding Tech" page of Erica's Framer site and the
// pictures she sent. The Framer text is in
// Portfolio/CaseStudy/imports/framer-2023/founder.md. Reworded to Canon/voice.md.
//
// What was changed from the Framer page, and why:
// - "Co-founding" is "founding" here. Her LinkedIn says Founder of Helix
//   Booking and Founding Experience Designer at SciSummary, and the rest of
//   this site follows that (2026-11-18).
// - "The Solution - Coming 2025" is left off. That date has passed, and
//   Canon does not say what happened after the planned beta.
// - The success metrics are things the team planned to measure, so they are
//   written that way. Nothing here says they were measured.
//
// Helix Booking has not launched yet (Erica, 2026-11-20).
// TODO(Erica): what you did at SciSummary. Canon has "research, design system
//   with tokens, AI engineers" and no more. Its section is short on purpose.
// TODO(Erica): Ariso. You said you will add it. It needs evidence and
//   public-use permission before it goes on the site.
// TODO(Erica): the intro wording.

export const founding = {
  title: 'Founding Designer',
  tagline: 'Products I helped start, from the first idea to the design system.',
  tags: ['0 to 1', 'Design systems', 'Research', 'AI products'],
  intro:
    "People ask me to start projects with them and lead the design. I listen well, I know the technical side, and I keep a team talking to each other. I'm strongest at design system documentation, ideation, and testing.",
  projects: [
    {
      id: 'scisummary',
      where: 'SciSummary · Founding designer · 2023 to present',
      title: 'Democratizing research',
      text: 'SciSummary uses AI to summarize scientific articles, so more people can read research.',
      site: { label: 'scisummary.com', href: SCISUMMARY_URL, preview: PREVIEWS.scisummary },
      quote: {
        label: 'The question that started it',
        text: 'Hey, could you run this article through that GPT thing?',
        who: 'Staci Heckel',
        role: "PhD chemist, and a co-founder's wife. January 2023",
        photo: '/images/founding/staci-heckel.png',
      },
      figures: [
        // The picture has a tall empty area under the screen, so only its top
        // part is shown: `ratio` is the width / height of the part to keep.
        { src: '/images/founding/scisummary-library.webp', alt: 'The SciSummary library, with article summaries as cards', caption: 'The library.', ratio: 2000 / 790 },
      ],
      layout: { quote: 'sm:col-span-4', figure: 'sm:col-span-8', lists: [] },
      soon: 'Case study coming soon',
    },
    {
      id: 'helix',
      // Last on the page (her ask the same day: "helix should be at the bottom").
      where: 'Helix Booking · Founder and lead designer',
      title: 'Making booking a breeze',
      logo: { src: '/images/founding/helix-logo.png', alt: 'Helix Booking', invert: true },
      // Erica, 2026-11-20: "update helix it is not yet". My reading: it has
      // not launched yet.
      text: 'A booking app for barbers, salons, and other people who run their own service business. I started it with two developers. It has not launched yet.',
      quote: {
        label: 'The problem',
        text: "Using Booksy, I often spend too much time trying to schedule appointments and manage inventory. It feels like I'm constantly jumping between different screens just to complete basic tasks. I need a more efficient way to handle bookings and manage my business.",
        who: 'Justin',
        role: 'Barbershop owner',
        photo: '/images/founding/justin.png',
      },
      figures: [
        { src: '/images/founding/helix-client-screens.webp', alt: 'Helix Booking screens for clients: home, a barbershop, picking a time, and a receipt', caption: 'For clients.' },
        { src: '/images/founding/helix-business-screens.webp', alt: 'Helix Booking screens for a business: calendar, agenda, appointment blocks, client and profile', caption: 'For the business.' },
      ],
      lists: [
        {
          label: 'My role',
          items: [
            'Built and maintained a design system for Android and iOS.',
            'Worked with the developers on token integration.',
            'Owned the UX of the key features, with a focus on ease of use for salon owners and clients.',
          ],
        },
        {
          label: 'What we planned to measure',
          items: [
            'Operational efficiency: salon capacity used, and fewer gaps between appointments.',
            'Adoption: how many salons take up Helix Booking in the first six months after launch.',
          ],
        },
      ],
      // How wide each box is, out of 12 columns (from 640px up).
      layout: {
        quote: 'sm:col-span-12',
        figure: 'sm:col-span-6',
        lists: ['sm:col-span-5', 'sm:col-span-7'],
      },
      study: '/case-study/helix-booking',
    },
  ],
  // A section with nothing in it yet: a pencil wireframe and "coming soon".
  // It is drawn first, above the projects (Erica, 2026-11-20: Ariso goes on top).
  next: { title: 'Ariso' },
};
