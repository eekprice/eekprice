// Home page copy. Layout follows the Figma frame "iPad mini 8.3 - 1"
// (Tailwind Portfolio, node 158:1376).

// Title recommendation (2026-09-30). The Figma said "Product Design Manager /
// At Yum! Brands", which is a past role. Swap these two lines to change it.
export const hero = {
  greeting: "I'm Erica",
  title: 'Principal Product Designer',
  subline: 'Founding designer at two AI startups',
};

export const sectionTitles = {
  caseStudies: 'Product Design Case Studies',
  // Figma: "Product Design Manager". These cards are delivery work, so the
  // heading says that. Change here if you want the original back.
  delivery: 'Program and Delivery Lead',
  connections: 'My Kind Connections',
};

// Cards under the second section. No write-ups yet.
// TODO(Erica): content for both. They map to the Topstep and GE program work.
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
// mouse rests. `reader` shows the first time "Read more" is opened in the hero.
export const cursorLines = {
  reader: 'ah, we have a reader, respect',
};
