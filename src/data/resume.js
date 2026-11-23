// The Resume page (pages/ResumePage.js). Source of truth is
// Portfolio/Canon/resume.md. Change it there first, then here.
// Anything marked TODO(Erica) there is left out here rather than guessed.

import { ARISO_URL, SCISUMMARY_URL, PREVIEWS } from './links';

export const intro =
  'Where I have worked and what I did there. Leadership roles are first, and case studies are linked where I have written them up.';

// `when` is shown as written. `links` are case studies on this site.
export const roles = [
  {
    role: 'Principal Product Consultant',
    // LinkedIn still lists this as Callibrity. Erica: "callibrity was bought by CGI".
    company: 'CGI',
    // The picture beside the role on the Resume page (Erica, 2026-11-20:
    // "logos on the left and cards on the right"). Hers, except CGI's, which
    // is the logo alone. `alt` names what is in the picture.
    // Erica, 2026-11-20: CGI smaller, with logos under it laid out like her
    // Bread Financial collage: Airbus, Fingrid, Volkswagen Group and Topstep.
    // Topstep is her client (the wordmark from topstep.com is white, so it is
    // on a dark chip). The other three are CGI's clients from cgi.com, not
    // hers; she asked for them ("Yes, show them", then this layout with no
    // label). The plane icon for the aerospace client is gone at her ask.
    // TODO(Erica): you asked for the aerospace client's logo here too. You had
    // that client's name taken off the site on 2026-11-19, so it is held until
    // you confirm.
    // `scatter` lays the logos out around the CGI logo, like her Yum picture
    // (her sketch, 2026-11-20: one above, one tilted at the top right, one to
    // the right, one below). Each mark's `at` is its place in the box, in
    // percent of the box, plus an optional tilt in degrees.
    logo: {
      src: '/images/resume/cgi.png',
      alt: 'CGI',
      scatter: true,
      at: { left: 0, top: 28, width: 56 },
      clients: [
        { src: '/images/resume/cgi-clients/airbus.png', alt: 'Airbus', at: { left: 0, top: 4, width: 48 } },
        { src: '/images/case-studies/brands/topstep-white.png', alt: 'Topstep', chip: 'dark', at: { left: 62, top: 0, width: 36, tilt: 10 } },
        { src: '/images/resume/cgi-clients/fingrid.png', alt: 'Fingrid', at: { left: 60, top: 42, width: 40, tilt: -35 } },
        { src: '/images/resume/cgi-clients/volkswagen-group.png', alt: 'Volkswagen Group', at: { left: 0, top: 76, width: 86 } },
      ],
    },
    place: 'Remote',
    when: 'June 2025 to present',
    reports: '4 direct reports',
    // First two lines are her LinkedIn description, reworded to voice.md.
    // TODO(Erica): confirm both client names can be public.
    points: [
      'I consult with large organizations to build new products from zero and improve enterprise systems. I bring product strategy, research, and design.',
      'I help clients find product-market fit, turn complex systems into experiences people can follow, and give them clear insight to decide with.',
      'I worked with Topstep and a global aerospace manufacturer on their data platforms.',
    ],
    // Erica, 2026-11-19: "add case studies to the resume page". the aerospace client first, as on Home.
    links: [
      // The role's own study first (Erica, 2026-11-20), then the two client studies.
      { label: 'Leading product work at CGI', to: '/case-study/cgi-leadership' },
      { label: 'Taking over an enterprise AI platform program mid-flight', to: '/case-study/aerospace-program' },
      { label: 'Cutting dropped trade data by 100% at Topstep', to: '/case-study/topstep' },
    ],
  },
  {
    role: 'UX Manager and Principal UX Designer',
    company: 'Yum Brands',
    logo: { src: '/images/resume/yum.png', alt: 'Yum, with The Habit Burger Grill, Pizza Hut, Taco Bell and KFC' },
    // Erica, 2026-11-20: "bitovi and yum were remote". (LinkedIn says Chicago.)
    place: 'Remote',
    when: 'March 2022 to September 2025',
    reports: '18 direct reports',
    points: [
      'I led the push to bring all Yum UX into one team with a North Star plan. I defined the roles and responsibilities, mapped how work moved, and set a vision for products including Poseidon and Dragontail.',
      'I worked with KFC, Taco Bell, and Pizza Hut to improve their digital experiences, with simpler user flows and better usability across the brands.',
      'I got UX involved a full quarter ahead of implementation, so product and development could define better solutions together. I combined bulk change requests into one workflow, which cut time to market.',
    ],
    links: [
      { label: 'Leading UX at Yum Brands', to: '/case-study/yum-ux-leadership' },
      { label: 'Speeding up the drive thru', to: '/case-study/yum-pos' },
      { label: 'Simplifying schemas in menus', to: '/case-study/menu-management' },
    ],
  },
  {
    // Title and start are from LinkedIn. The Framer resume says Senior UX Consultant, June 2020. TODO(Erica): confirm.
    role: 'Senior Product Designer',
    company: 'Bitovi',
    logo: { src: '/images/resume/bitovi.png', alt: 'Bitovi, with BAFS, the U.S. Marine Corps, Apple, Marie Forleo, KFC and Yum' },
    place: 'Remote', // Erica, 2026-11-20
    when: 'January 2020 to March 2022',
    // TODO(Erica): "6 months to 6 weeks" is under Alliance Data too. Confirm it is true of both.
    points: [
      'I advised clients in banking, military, forensics, and healthcare on UX practice, with recommendations tied to customer needs and business goals.',
      'I led research to find what customers needed, and I started the accessibility practice.',
      'I cut feature iteration time from 6 months to 6 weeks. I moved the UX team to Figma and pushed for usertesting.com.',
    ],
    // Erica, 2026-11-21: the Grier study was done at Bitovi, so link it here.
    links: [
      { label: 'Connecting forensic cases with AI before it was popular', to: '/case-study/grier-forensics' },
    ],
  },
  {
    role: 'UX Designer',
    company: 'Alliance Data, now Bread Financial',
    logo: { src: '/images/resume/bread-financial.png', alt: "Bread Financial, with LOFT, Victoria's Secret, Forever 21 and Lexus" },
    place: 'Remote',
    when: 'April 2017 to January 2020',
    points: [
      "I worked with clients like Victoria's Secret, LOFT, and Lexus on their payment experiences.",
      'I pushed for accessibility and for research with real users.',
      'I ran the velocity framework, which cut feature iteration time from 6 months to 6 weeks.',
      'I taught stakeholders the value of UX and built relationships with users.',
    ],
    links: [
      { label: 'Asking for a higher credit limit', to: '/case-study/credit-limit-increase' },
    ],
  },
  {
    role: 'UX Designer',
    company: 'Sedgwick',
    logo: { src: '/images/resume/sedgwick.png', alt: 'Sedgwick, with Starbucks, GM, Walmart and Delta' },
    // Dates from LinkedIn. The Framer resume says June 2015 to March 2017. TODO(Erica): confirm.
    when: 'April 2016 to April 2017',
    points: [
      'I led UX design for a patient management system used by healthcare professionals, within industry regulations.',
      'I ran user research and usability testing.',
      'I worked directly with clients like Starbucks and Walmart.',
    ],
  },
  {
    role: 'UX Research Intern',
    company: 'CrossChx, now called Olive',
    logo: { src: '/images/resume/olive.png', alt: 'Olive' },
    // Dates from LinkedIn. The Framer resume says January to June 2015. TODO(Erica): confirm.
    when: 'January 2016 to April 2016',
    points: [
      'I ran UX research for hospitals on how patients and staff used digital systems.',
      'I analyzed the research and made recommendations.',
    ],
  },
];

// Titles and dates are from LinkedIn (read 2026-11-16).
export const sideProjects = [
  { name: 'Ariso', role: 'Founding experience designer', when: 'July 2025 to present', href: ARISO_URL, preview: PREVIEWS.ariso },
  { name: 'SciSummary', role: 'Founding experience designer', when: 'November 2023 to present', href: SCISUMMARY_URL, preview: PREVIEWS.scisummary },
  { name: 'Helix Booking', role: 'Founder and lead designer', when: 'June 2019 to present', to: '/case-study/helix-booking' },
  // Erica, 2026-11-21: link this to the Education page under Side Projects.
  { name: 'Memorisely', role: 'UX bootcamp teacher', when: 'October 2021 to October 2026', to: '/education' },
];

export const education = [
  { name: 'Ohio University', detail: "Bachelor's degree, Design and Visual Communications", when: '2011 to 2015' },
  { name: 'Amanda J. Cunningham Leadership Center', detail: 'Leadership Certification', when: 'January 2014' },
];

export const skills = ['Product Design', 'User Research', 'Product Management', 'Wireframing', 'User Experience Design'];
