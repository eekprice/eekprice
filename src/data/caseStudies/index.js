// Case study page content. Source of truth is Portfolio/CaseStudy/*.md;
// this file is the site-ready cut of those drafts. Anything marked
// TODO(Erica) there is left out here rather than guessed.
//
// Block types the page knows how to render:
//   p        { text }
//   figure   { src, alt, caption? }
//   quote    { text, who }
//   quotes   { items: [{ text, who }] }          grid of quote cards
//   note     { text }                             sticky note aside
//   list     { items: [string] }
//   steps    { items: [{ title, text }] }

const img = (name) => `/images/case-studies/${name}.webp`;

export const caseStudies = [
  {
    slug: 'yum-pos',
    title: 'Speeding up the drive thru',
    tagline: 'KFC and Taco Bell. One flexible flow that follows how customers actually order.',
    hero: { src: img('kfc-pos-final-ui-with-team-quotes'), alt: 'Final Taco Bell and KFC POS screens with team member feedback' },
    meta: {
      role: 'Principal UX Designer. I led the design, ran the research, and worked with two designers, developers, product managers, and restaurant operations.',
      company: 'Yum Brands',
      team: 'Me, two designers, a UI designer for branding, developers, product managers, restaurant ops',
      tags: ['POS', 'In-store research', 'Design system', 'White label'],
    },
    summary:
      "I led UX for the point of sale that KFC and Taco Bell team members use to take orders. The order modification flow was rigid and customers don't order in a rigid way. I redesigned it so a team member can follow the customer's conversation instead of fighting the screen, and the patterns had to work as a white label for the other Yum brands.",
    sections: [
      {
        heading: 'The problem',
        blocks: [
          { type: 'p', text: "Ordering at the counter or drive thru is a conversation. The old POS wasn't built for one." },
          {
            type: 'quote',
            text: "My biggest complaint is how rigid my team members have to be in the drive thru. Ordering is a conversation and the POS isn't flexible to accommodate them.",
            who: 'Angela, KFC Manager',
          },
          {
            type: 'p',
            text: 'A real bucket order sounds like this: extra crispy, half original half spicy, three sides, two sauces, ten pieces, swap a thigh for a leg. The system wanted those in a fixed order. Team members had to hold the whole thing in their head and enter it the way the device wanted. New team members didn\'t know the menu well enough to do that with confidence.',
          },
          { type: 'figure', src: img('kfc-pos-legacy-par-terminal-and-flow'), alt: 'The legacy PAR terminal and the old modification flow', caption: 'The old terminal and the fixed flow it forced.' },
        ],
      },
      {
        heading: 'What I did',
        blocks: [
          {
            type: 'p',
            text: "I spent a lot of time in stores. Over the project we ran more than 35 studies with over 200 participants and I logged 60 or so hours watching orders get taken, in stores across four states. That's where the pattern became clear: the problem was flow, not buttons.",
          },
          { type: 'figure', src: img('kfc-pos-store-visit-photos'), alt: 'Store visits at KFC and Taco Bell', caption: 'Store visits. That is me at the Taco Bell line.' },
          {
            type: 'p',
            text: 'I ran design workshops with stakeholders so the product, dev, and ops people were in the room when we sketched. We started on paper.',
          },
          { type: 'figure', src: img('kfc-pos-paper-sketches-strip'), alt: 'Paper sketches from the workshops', caption: 'Workshop sketches with dot votes.' },
          { type: 'p', text: 'Then I built the concepts out in Figma and tested them with team members. A few things I decided along the way:' },
          {
            type: 'list',
            items: [
              'Select the item first, then show only what belongs to it. That cut the cognitive load on the first tap and still let a team member reach anything the customer might change.',
              'Put the common upgrades right on the item. "Make it a combo" comes up constantly, so it shouldn\'t be a hunt.',
              'Show prices on the modifiers. Customers ask for the cheapest option and team members were guessing.',
            ],
          },
          {
            type: 'note',
            text: "Some ideas didn't survive testing. A folder-style drill-down was cleaner but there wasn't enough screen for it. Icon-only modifiers looked good but nobody was sure people could rely on them without text.",
          },
          { type: 'figure', src: img('kfc-pos-figma-wireframe-board'), alt: 'The Figma board for the POS flows', caption: 'The Figma board. Every flow, every state.' },
          { type: 'figure', src: img('kfc-pos-modifier-panel-wireframe'), alt: 'Modifier panel wireframe', caption: 'The modifier panel: quantity, recipe, actions, all in one place.' },
          {
            type: 'p',
            text: "I scoped an MVP from the user journeys and ops findings, wrote the hand-off documentation, and worked with the UI designer to apply each brand's look on top of the shared patterns. I also proposed the UX metrics to track after launch so the team could iterate on data.",
          },
        ],
      },
      {
        heading: 'The solution',
        blocks: [
          {
            type: 'p',
            text: "One flexible modification flow that follows the conversation: pick the item, adjust quantity, swap pieces or flavors, add sides and sauces, upgrade to a combo, all from one panel. The same interaction patterns ship for KFC and Taco Bell with different branding, and they're built to extend to Pizza Hut and Habit Burger.",
          },
          { type: 'figure', src: img('kfc-pos-final-ui-with-team-quotes'), alt: 'Final Taco Bell and KFC screens with team member feedback' },
        ],
      },
      {
        heading: 'What team members said',
        blocks: [
          { type: 'p', text: 'Team members could keep up with how customers actually order, so orders moved faster.' },
          {
            type: 'quotes',
            items: [
              { text: 'Very easy, way better than deleting and adding [the swap from Crunchy Taco to Supreme].', who: 'Anthony, Taco Bell Service Champion' },
              { text: 'I like seeing the prices. Customers always ask for the cheapest option.', who: 'Maria, KFC Team Member' },
              { text: 'Make it a combo happens frequently, this has it right here.', who: 'Irais, Taco Bell Service Champion' },
              { text: 'Had to look harder without the images on the ingredients.', who: 'Brandon, Taco Bell Service Champion' },
            ],
          },
        ],
      },
    ],
    highlights: [
      'Led UX for a POS used across two national brands, built as a white label for two more.',
      '35+ studies, 200+ participants, 60+ hours in store. The design came from watching orders, not from a spec.',
      "Turned a rigid flow into one that follows the customer's conversation.",
    ],
  },

  {
    slug: 'menu-management',
    title: 'Simplifying schemas in menus',
    tagline: "Yum's Menu Management tool, rebuilt around the people who publish menus instead of the API.",
    hero: { src: img('menu-management-final-ui-tree-grid'), alt: 'Menu Management with the tree grid and action panel' },
    meta: {
      role: 'Principal UX Designer. I led the UX transformation, ran the research, and facilitated the design studio with API engineers, product owners, and developers.',
      company: 'Yum Brands',
      team: 'Me, API engineers, product owners, developers',
      tags: ['Admin tool', 'Information architecture', 'Design studio', 'Data grid'],
    },
    summary:
      "Menu Management is the internal tool that decides what's on the menu, what it costs, and where it's sold across every Yum store and channel. I led the UX work to turn it from a screen built around the API's data model into one built around the people who publish menus. Three things came out of it: a tree view that shows how menu items relate, an admin context layer, and a dynamic action panel.",
    sections: [
      {
        heading: 'The problem',
        blocks: [
          { type: 'p', text: 'Three things kept coming up in interviews and usability tests:' },
          {
            type: 'list',
            items: [
              'People were scared to publish. A mistake in a menu goes live in stores, so users hesitated and double-checked everything by hand.',
              "It didn't scale. The system couldn't handle the number of stores, channels, and pricing rules the business was heading toward.",
              'Bulk updates were painful. The data structure was complicated enough that changing one price across many stores was a project.',
            ],
          },
          {
            type: 'p',
            text: 'Underneath all three was the same cause. The UI had been designed around the data model, so users had to understand the API to get anything done.',
          },
        ],
      },
      {
        heading: 'What I did',
        blocks: [
          {
            type: 'p',
            text: "I started with a deep-dive discovery workshop to understand the existing system and hear from the people using it. That's where the three goals came from: simplify bulk updates, show relationships, and help people understand what they're changing.",
          },
          { type: 'figure', src: img('menu-management-discovery-workshop-whiteboards'), alt: 'Discovery workshop whiteboards and the pricing model', caption: 'Discovery workshop. The pricing model on the right is where the scale problem lived.' },
          {
            type: 'p',
            text: 'Then I moved the team from API-driven design to user-driven design. I chose a design studio format so the API engineers, product owners, and developers sketched alongside me instead of reviewing my work after the fact. Everybody drew flows for the two main personas, Manny (updates from the menu) and Chelsea (updates from a store), and we voted.',
          },
          { type: 'figure', src: img('menu-management-design-studio-sketches'), alt: 'Design studio sketches with dot votes', caption: 'Design studio. Engineers and product owners sketching, not just reviewing.' },
          { type: 'p', text: 'Three ideas came out of the studio and I carried them through prototypes and rounds of user testing:' },
          {
            type: 'steps',
            items: [
              { title: 'Visualize relationships', text: 'An advanced data grid with a tree view. Bundle, choice, product, variant, slot, modifier, all nested so you can see how a change ripples.' },
              { title: 'Admin for context', text: "Show where you are and what you're affecting, so publishing stops feeling like a leap." },
              { title: 'Dynamic action panel', text: 'Select an entity and the panel shows only the actions that apply to it. Nobody has to decode the data model to find the right button.' },
            ],
          },
          { type: 'note', text: 'We also added diffing: a before-and-after review of pending changes before anything goes live.' },
        ],
      },
      {
        heading: 'The solution',
        blocks: [
          { type: 'figure', src: img('menu-management-final-ui-tree-grid'), alt: 'Menu Management final UI with the tree grid and action panel' },
          { type: 'p', text: 'A working menu you can search, expand, and edit in place. Range pricing lives in the action panel. Save a patch, review the diff, then publish.' },
        ],
      },
      {
        heading: 'Outcome',
        blocks: [
          {
            type: 'quote',
            text: "I know we've asked for a lot of different changes and enhancements to patching, so I appreciate this creative approach. Instead of just implementing what we've asked for, you're aiming for a better overall solution. I like that. We'll need to play with it and see how it works in practice. I can see this leading to a significant rewrite of the way we currently do things.",
            who: 'Stakeholder, during review',
          },
          {
            type: 'p',
            text: 'Users could see how items connect, so there was less confusion. Admin context reduced the fear of publishing. The action panel made the common tasks short.',
          },
        ],
      },
    ],
    highlights: [
      'Turned an API-shaped admin tool into a user-shaped one.',
      'Ran a design studio that got engineers and product owners sketching, not just reviewing.',
      'Tree view, action panel, and diffing solved fear, scale, and bulk edits with one model.',
    ],
  },

  {
    slug: 'helix-booking',
    title: 'Making booking a breeze',
    tagline: 'Helix Booking. A native iOS and Android booking app I started with two developers.',
    hero: { src: img('helix-app-screens-strip'), alt: 'Helix Booking app screens' },
    meta: {
      role: 'Founder and lead designer. I owned the design system for iOS and Android, the UX of the core features, and the product process and documentation.',
      company: 'Helix Booking, my own startup',
      team: 'Andrew (iOS), Kots (Android), Brandon, me',
      tags: ['0 to 1', 'Native iOS and Android', 'Design system', 'Small business'],
    },
    summary:
      'Helix is a booking app for barbers, salons, and other people who run their own service business. I started it with two developers. I built and maintained the design system for both platforms, worked with the devs on token integration, and owned the UX of the features salon owners and clients touch most.',
    sections: [
      {
        heading: 'The problem',
        blocks: [
          {
            type: 'p',
            text: "In 2018 Andrew moved to a new city and couldn't find a barber he trusted. The apps in the App Store were confusing, expensive, and didn't feel trustworthy. That was the spark.",
          },
          {
            type: 'p',
            text: 'When we looked at the market it got bigger. The beauty industry is worth about $532 billion globally and most of the businesses in it are self-owned. When we interviewed salon owners, booking was one of several things eating their time, along with inventory and reviews. It was costing them money and hurting the service they could give.',
          },
        ],
      },
      {
        heading: 'What I did',
        blocks: [
          { type: 'p', text: 'I did the research and turned it into something the three of us could build.' },
          {
            type: 'list',
            items: [
              'Interviewed salon owners and clients. Built two personas, Sarah the salon owner and Mark the busy professional, so we designed for real days, not features.',
              'Ran the competitive analysis. The gap was obvious: the existing apps had no human touch. That became our angle.',
              'Set scope. We had no budget to speak of and needed to ship fast, so I kept the first version to booking for clients and the tools owners need to run their day.',
              'Built the design system on native iOS and Android components instead of a custom kit. That kept the devs fast and the app feeling like it belongs on the phone.',
              'Ran the process. Linear board, flows, and documentation so a three-person team working nights stayed in sync.',
            ],
          },
          { type: 'figure', src: img('helix-team-call-and-figma'), alt: 'Team call and the Figma file', caption: 'A typical build night. My kiddo was on snack duty.' },
          { type: 'figure', src: img('helix-linear-board-flow-and-barber'), alt: 'Linear board, booking flow, and research', caption: 'Linear board, the booking flow, and the research behind it.' },
          { type: 'p', text: 'We went through a lot of iterations. Usability was the rule for what shipped.' },
        ],
      },
      {
        heading: 'The solution',
        blocks: [
          {
            type: 'p',
            text: 'A client app to find a business, pick a service, pick a time, and pay, with reviews and photos so trust is built in. A business app for the owner: schedule, appointment blocks, client list, services, payments, and check-in. Both native.',
          },
          { type: 'figure', src: img('helix-app-screens-strip'), alt: 'Helix app screens for clients and business owners' },
        ],
      },
      {
        heading: 'Where it landed',
        blocks: [
          // TODO(Erica): what happened after the planned early 2024 beta. See CaseStudy/helix-booking.md.
          { type: 'p', text: 'We planned to open a beta in early 2024 to get real feedback from early users before going wider.' },
        ],
      },
    ],
    highlights: [
      'Started a product from zero with two developers and no budget.',
      'Owned a two-platform design system built on native components.',
      'Ran product process for a tiny team so it actually shipped.',
    ],
  },
];

export const getCaseStudy = (slug) => caseStudies.find((s) => s.slug === slug);

export const nextCaseStudy = (slug) => {
  const i = caseStudies.findIndex((s) => s.slug === slug);
  if (i === -1) return null;
  return caseStudies[(i + 1) % caseStudies.length];
};
