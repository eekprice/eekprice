// Home page copy. Layout follows the Figma frame "iPad mini 8.3 - 1"
// (Tailwind Portfolio, node 158:1376).

// Title recommendation (2026-09-30). The Figma said "Product Design Manager /
// At Yum! Brands", which is a past role. Swap these two lines to change it.
export const hero = {
  greeting: "I'm Erica",
  // Erica, 2026-11-18: "change my title to product Design leader".
  title: 'Product Design Leader',
  // Erica, 2026-11-18: "tagline should be founding designer and Product consultant".
  subline: 'Founding designer and product consultant',
};

export const sectionTitles = {
  caseStudies: 'Product Design Case Studies',
  // Erica, 2026-11-16: leadership gets its own section, and it is the first one on the page.
  leadership: 'Leadership Experience',
  // Figma: "Product Design Manager". These cards are delivery work, so the
  // heading says that. Change here if you want the original back.
  delivery: 'Program and Delivery Lead',
  connections: 'My Kind Connections',
};

// Cards in the Leadership Experience section (components/ExperienceCard.js).
// Erica, 2026-11-16: leadership is a card, not a slide strip with a sticky,
// with a second one for her role as Principal Product Consultant at CGI.
// The Yum card's words come from CaseStudy/yum-ux-leadership.md.
//
// 2026-11-18, for the Workiva application: Yum is the featured card. A card
// with `size: 'small'` is a supporting one, drawn smaller in a row under it
// (CGI, then the aerospace client). A card with `hidden: true` is kept here but not
// drawn. `linkLabel` is what the button says.
export const leadershipCards = [
  {
    where: 'Yum Brands · March 2022 to September 2025',
    // Six, from Canon/about.md. Erica pointed to it on 2026-11-16.
    reports: '6 direct reports',
    // TODO(Erica): your doc says "UX Manager and Principal Product Designer". Change it here if the card should say something else.
    role: 'UX Manager and Principal Product Designer',
    text: 'I set the direction for how design should support the move to Byte, built the system the team ran on, and pushed for research in real stores.',
    points: [
      // "Proposed": only the store research workstream is recorded as going ahead.
      { title: 'Direction', text: 'I proposed four workstreams to turn many products into one platform.' },
      { title: 'How the team works', text: 'A checklist at intake, one Jira workflow, critiques at 30, 60 and 90.' },
      // TODO(Erica): the sources show the plan for Keystone, not what the fieldwork found. Say what was carried out.
      { title: 'In stores', text: 'Project Keystone, a field study across four brands. I owned the plan.' },
    ],
    tags: ['Leadership', 'Design ops', 'Design strategy', 'Field research'],
    href: '/case-study/yum-ux-leadership',
    linkLabel: 'Read the Yum leadership case study',
    // The yellow sticky that slides out by the title, like the drive thru card's
    // green one. Erica asked for it back on 2026-11-16. Same yellow as this
    // study's note in the nav fan.
    peek: { title: 'Leading UX at Yum Brands', color: 'yellow' },
    // Erica, 2026-11-18: the Yum logo on this card too. It pops in with the
    // sticky, on the card's top right corner.
    // TODO(Erica): this Yum logo was cut out of your mock. Send the real file.
    stickers: [
      { image: '/images/case-studies/brands/yum.webp', name: 'Yum', className: 'w-12 lg:w-14 right-5 -top-5 lg:right-8 lg:-top-6', rotate: 6 },
    ],
  },
  // Erica, in chat, 2026-11-16: "im a principal product consultant at CGI where I
  // worked with Topstep and [an aerospace client]. working on their data platforms." (client name taken out)
  // Dates are from LinkedIn (2026-11-16), where the company is still Callibrity.
  // TODO(Erica): a write-up to link.
  // TODO(Erica): Canon says the aerospace client work is under CMMC and client confidentiality.
  // Confirm both client names can be public before this is pushed.
  // The private outline for a small CGI case is CaseStudy/cgi-consulting.md.
  // This card stays short until Erica fills that in.
  {
    size: 'small',
    where: 'CGI · June 2025 to present',
    // Erica, 2026-11-16: "i have 4 at CGI".
    reports: '4 direct reports',
    role: 'Principal Product Consultant',
    text: 'I consult with large organizations to build new products from zero and improve enterprise systems. I worked with Topstep and a global aerospace manufacturer on their data platforms.',
    // The leadership write-up for this role (CaseStudy/cgi-consulting.md, drafted
    // 2026-11-19). Not cleared for public use yet.
    href: '/case-study/cgi-leadership',
    // Erica, 2026-11-19: "put the two case studies here", with the space to the
    // right of this card marked, then "should be one container actually". So
    // the role and its two studies are one card: the role on the left, two link
    // tiles on the right (StudyLinks in ExperienceCard.js). `label` is the small line over the study's title.
    // the aerospace client first (Erica, same day: this one goes on top).
    studies: [
      { slug: 'aerospace-program', label: 'Aerospace client' },
      { slug: 'topstep', label: 'Topstep' },
    ],
  },
  // the aerospace client as its own supporting card. Erica, 2026-11-18: build the card,
  // keep it off the site until she gives facts she is cleared to share (Canon
  // says the work is under CMMC and client confidentiality). Nothing below is
  // public copy yet. The outline is the aerospace program draft in CaseStudy/.
  // TODO(Erica): the role line, dates, one or two sentences, and whether the aerospace client is named.
  {
    hidden: true,
    size: 'small',
    where: 'Aerospace client',
    role: 'TODO(Erica)',
    text: 'TODO(Erica)',
  },
];

// Cards under the second section. No write-ups yet.
// TODO(Erica): content for both. They map to the Topstep and the aerospace client program work.
export const deliveryCards = [
  { title: 'PRD clarity' },
  { title: 'Jira wrangling' },
];

// Testimonials, shown as yellow notes in two staggered columns.
// `more` is the rest of the quote, shown when "Read more" is tapped.
export const kindConnections = {
  left: [
    {
      from: 'From Bri, my kind direct report',
      text:
        "I have been very lucky to be on Erica's team at Yum! Brands. I admire her so much as a design leader, a professional, and a person, and I can honestly say that what I have learned from her has transformed my career in product design. If you're looking for a visionary leader with infectious energy, product design/ UX/UI guru, true team player and genuine soul, Erica is your girl!",
      // TODO(Erica): the rest of Bri's note, if there is more
      name: 'Bri Dorgan',
      role: 'UX Research',
      photo: '/images/people/bri-dorgan.webp',
    },
    {
      from: 'From Llana, my thoughtful student',
      text:
        "I had the privilege of being a student in Erica's UXR class at Memorisely, and I can confidently say that she is one of the best and most empathetic UX professionals out there. Erica brings incredible energy to her classes and goes the extra mile to ensure that her lessons are engaging and informative.",
      // TODO(Erica): the rest of Llana's note, and her photo
      name: 'Llana Holmes',
      role: 'Consumer Insights & Researcher',
      photo: null,
    },
  ],
  right: [
    {
      from: 'From Ryan, my innovative mentor and co-author',
      text:
        'Erica is a phenomenal person to have on your team. She is professional, driven, and very knowledgeable in UX and Product Design. She has a strong passion for accessibility (a11y) design. And she is an advocate for modern tooling and is my go-to when I have a question about Figma and unmoderated user-testing tools.',
      more:
        'Erica brings a peppy, happy nature to the team and always looks on the bright side of things. That said, she is also a realist, is willing to speak truth to power, and tell it like it is. She is absolutely great with clients and understands how to best communicate her product recommendations. I highly recommend Erica for any senior-level roles in UX or product design.',
      name: 'Ryan Wilson',
      // Figma says "Caliberty". TODO(Erica): confirm spelling (Callibrity?).
      role: 'Head of Product at Callibrity',
      photo: '/images/people/ryan-wilson.webp',
    },
    {
      from: 'From Jef, my accessibility colleague',
      text:
        "Erica is, without question, one of the most positive professionals I've worked with throughout my career. Erica enjoys learning and is very passionate about discovering new tools and processes to improve her work. She proactively asks for feedback and enjoys collaboration. Erica does not shy away from complex design challenges and the outcomes reflect her effort and impact.",
      // Figma spells it "Lippiatte"; the 2023 site had "Lippiatt". TODO(Erica): confirm.
      name: 'Jef Lippiatt',
      role: 'Accessibility UXer and Podcast Host',
      photo: '/images/people/jef-lippiatt.webp',
    },
  ],
};

export const closer = {
  heading: 'Still here?',
  // TODO(Erica): LinkedIn URL so "LinkedIn request" can be a link.
  text:
    'Only 30% of viewers make it this far. I appreciate the scroll. Shoot me a LinkedIn request or send me an email if you want to connect. I would love to know what brought you this far down.',
};

// The little tag next to the cursor on desktop, like a Figma cursor. It shows
// once per visit: the first time the mouse pauses near the bottom of the page.
// One line is picked at random. `at` is scroll depth from 0 to 1.
export const cursorLabels = [
  { at: 0, lines: [] },
  {
    at: 0.85,
    lines: [
      "you read the whole thing. we're basically coworkers now",
      'the pineapple is proud of you',
      "that's the end. I like you already",
    ],
  },
];

// Lines the cursor says when the visitor does something, instead of when the
// mouse rests. `reader` shows the first time a comment is opened in the hero.
export const cursorLines = {
  reader: 'ah, we have a reader, respect',
};

// The comment pins on the hero's about box. The comments themselves are the
// second and third paragraphs of the bio, in
// components/atoms/AtomAboutMeContent.js. `title` is the heading of an open
// comment. The avatar shows the first letter of `author`.
export const heroComments = {
  author: 'Erica',
  time: 'Just now',
  title: 'Comment',
};
