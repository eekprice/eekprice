// The Resume page (pages/ResumePage.js). Source of truth is
// Portfolio/Canon/resume.md. Change it there first, then here.
// Anything marked TODO(Erica) there is left out here rather than guessed.

export const intro =
  'Where I have worked and what I did there. Leadership roles are first, and case studies are linked where I have written them up.';

// `when` is shown as written. `links` are case studies on this site.
export const roles = [
  {
    role: 'Principal Product Consultant',
    // LinkedIn still lists this as Callibrity. Erica: "callibrity was bought by CGI".
    company: 'CGI',
    place: 'Remote',
    when: 'June 2025 to present',
    reports: '4 direct reports',
    // First two lines are her LinkedIn description, reworded to voice.md.
    // TODO(Erica): confirm both client names can be public.
    points: [
      'I consult with large organizations to build new products from zero and improve enterprise systems. I bring product strategy, research, and design.',
      'I help clients find product-market fit, turn complex systems into experiences people can follow, and give them clear insight to decide with.',
      'I worked with Topstep and GE Aerospace on their data platforms.',
    ],
  },
  {
    role: 'UX Manager and Principal UX Designer',
    company: 'Yum Brands',
    // LinkedIn says Chicago, the Framer resume says Remote, so no place is shown. TODO(Erica): which one.
    when: 'March 2022 to September 2025',
    reports: '6 direct reports',
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
    when: 'January 2020 to March 2022',
    // TODO(Erica): "6 months to 6 weeks" is under Alliance Data too. Confirm it is true of both.
    points: [
      'I advised clients in banking, military, forensics, and healthcare on UX practice, with recommendations tied to customer needs and business goals.',
      'I led research to find what customers needed, and I started the accessibility practice.',
      'I cut feature iteration time from 6 months to 6 weeks. I moved the UX team to Figma and pushed for usertesting.com.',
    ],
  },
  {
    role: 'UX Designer',
    company: 'Alliance Data, now Bread Financial',
    place: 'Remote',
    when: 'April 2017 to January 2020',
    points: [
      "I worked with clients like Victoria's Secret, LOFT, and Lexus on their payment experiences.",
      'I pushed for accessibility and for research with real users.',
      'I ran the velocity framework, which cut feature iteration time from 6 months to 6 weeks.',
      'I taught stakeholders the value of UX and built relationships with users.',
    ],
  },
  {
    role: 'UX Designer',
    company: 'Sedgwick',
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
  { name: 'Ariso', role: 'Founding experience designer', when: 'July 2025 to present', href: 'https://ariso.ai/' },
  { name: 'SciSummary', role: 'Founding experience designer', when: 'November 2023 to present', href: 'https://scisummary.com/' },
  { name: 'Helix Booking', role: 'Founder and lead designer', when: 'June 2019 to present', to: '/case-study/helix-booking' },
  { name: 'Memorisely', role: 'UX bootcamp teacher', when: 'October 2021 to October 2026' },
];

export const education = [
  { name: 'Ohio University', detail: "Bachelor's degree, Design and Visual Communications", when: '2011 to 2015' },
  { name: 'Amanda J. Cunningham Leadership Center', detail: 'Leadership Certification', when: 'January 2014' },
];

export const skills = ['Product Design', 'User Research', 'Product Management', 'Wireframing', 'User Experience Design'];
