import { PREVIEWS } from '../links';

// Case study page content. Source of truth is Portfolio/CaseStudy/*.md;
// this file is the site-ready cut of those drafts. Anything marked
// TODO(Erica) there is left out here rather than guessed.
//
// Block types the page knows how to render:
//   p        { text }
//   heading  { text }                             a step inside a section
//   figure   { src, alt, caption?, invert? }      invert: flip to light in dark mode
//   quote    { text, who }
//   quotes   { items: [{ text, who }] }          grid of quote cards
//   note     { text }                             sticky note aside
//   list     { items: [string] }
//   steps    { items: [{ title, text }] }
//   stickies { items: [string] }                  yellow sticky notes, like In short
//   points   { items: [{ title, text }], ordered? }  list with a bold lead-in on each item
//   table    { head: [string], rows: [[string]], caption? }
//   diagram  { name, caption? }                    a drawing from components/caseStudy/Diagrams.js
//
// `overview` (optional) is the set of cards at the top. See components/caseStudy/Overview.js.

const img = (name) => `/images/case-studies/${name}.webp`;

export const caseStudies = [
  {
    slug: 'yum-pos',
    // Unused since 2026-11-21: Erica didn't like the result strip. "In short"
    // (`highlights`) is the summary at the top now.
    results: [
      { value: '35+', label: 'studies' },
      { value: '200+', label: 'participants' },
      { value: '60+', label: 'hours in store' },
    ],
    // The mark that pops in on this study's Past Work card on hover (Erica, 2026-11-20).
    // Yum is the main mark (top right). Then the brands from this study's home card.
    workLogo: [
      { src: '/images/case-studies/brands/yum.webp', name: 'Yum' },
      { src: '/images/case-studies/brands/kfc.webp', name: 'KFC', h: 'h-7' },
      { src: '/images/case-studies/brands/taco-bell.webp', name: 'Taco Bell', h: 'h-10' },
    ],
    homeSection: 'case-studies',
    title: 'Speeding up the drive thru',
    linkLabel: 'Read the drive thru case study',
    tagline: 'KFC and Taco Bell. One flexible flow that follows how customers actually order.',
    hero: { src: img('kfc-pos-final-ui-with-team-quotes'), alt: 'Final Taco Bell and KFC POS screens with team member feedback' },
    // For this study's sticky note in the nav fan (StickyFan.js): a picture
    // that is always on the note, and brand logos that pop out on hover.
    // `spot` is top, left or right of the note.
    note: {
      image: img('kfc-pos-new-screens-with-quotes'),
      brands: [
        { name: 'Yum', src: '/images/case-studies/brands/yum.webp', spot: 'top' }, // TODO(Erica): cut out of your mock. Send the real logo file.
        { name: 'KFC', src: '/images/case-studies/brands/kfc.webp', spot: 'left' },
        { name: 'Taco Bell', src: '/images/case-studies/brands/taco-bell.webp', spot: 'right' },
      ],
    },
    meta: {
      role: 'Design leader. I led the design, ran the research, and worked with two designers, developers, product managers, and restaurant operations.',
      company: 'Yum Brands',
      team: 'Me, two designers, a UI designer for branding, developers, product managers, restaurant ops',
      // From Canon/yum-byte-stats.md (Byte Point of Sale footprint, spring 2025).
      // TODO(Erica): confirm Byte Point of Sale is this POS and the number is public.
      scale: '7,500 KFC and Taco Bell restaurants in the U.S., as of spring 2025',
      tags: ['POS', 'In-store research', 'Design system', 'White label'],
    },
    // The summary cards. Copy, layout, and images are from Erica's Figma
    // (Portfolio 2024, nodes 17:10775 and 1:11519), with two typos fixed.
    // The same cards are the slides on the home page, except `screen`,
    // which Erica added later for the case study page only.
    overview: {
      problem: {
        title: 'Problem',
        quote: "My biggest complaint is how rigid my team members have to be in the drive thru. Ordering is a conversation and the POS isn't flexible to accommodate them",
        who: 'Angela - KFC Manager',
        avatar: '/images/case-studies/kfc-employee.png',
      },
      photo: {
        title: 'The old POS',
        src: '/images/pos-legacy.webp',
        poster: '/images/pos-legacy-poster.webp',
        alt: 'A team member using the legacy POS in the drive thru',
        emoji: '😬',
      },
      // The old screen itself, recorded in 2022. It sits next to the clip
      // above on the case study page only (not a home slide). `contain`
      // shows the whole recording on black, not cropped.
      screen: {
        title: 'The old POS, on screen',
        src: '/images/case-studies/kfc-pos-old-screen-recording.gif',
        poster: '/images/case-studies/kfc-pos-old-screen-recording-poster.webp',
        alt: 'Screen recording of the old KFC POS. A Famous Bowl in the order is opened on a separate modifier screen and the cheese is removed. An error says an item must be highlighted to make a substitution. After going back to the menu and into the modifiers again, the bowl becomes a Spicy Bowl.',
        contain: true,
      },
      solution: {
        title: 'The solution',
        image: { src: '/images/kfc-pos-concept.webp', alt: 'The new KFC and Taco Bell order screens' },
        quotes: [
          { text: 'Make it a combo happens frequently, this has it right here.', who: 'Irais - TB Service Champion' },
          { text: '“I like seeing the prices - customers always ask for the cheapest option.”', who: 'Maria - KFC Team Member' },
          { text: '"Very easy, way better than deleting and adding [the swap from Crunchy Taco to Supreme]."', who: 'Anthony - TB Service Champion' },
        ],
      },
      benefits: {
        title: 'Benefits',
        items: [
          {
            label: 'Team Member Impact',
            text: 'With more efficient processes, users can focus on maintaining the quality of service, ensuring that each order is accurate and meets customer expectations.',
          },
          {
            label: 'Business Impact',
            text: 'More customers can be served in the same time, leading to increased sales.',
          },
        ],
        image: { src: img('kfc-bucket'), alt: 'A bucket of Kentucky Fried Chicken' },
      },
      research: {
        title: 'Research',
        // Erica running a usability test in a store. `position` picks the
        // part of the photo that shows in the card's wide, short space.
        photo: {
          src: img('kfc-pos-usability-testing-in-store'),
          alt: 'Me running a usability test in a Taco Bell back office. A team member in a headset tries the new POS on a touchscreen, and the session is being filmed.',
          position: 'object-[50%_46%]',
        },
        stats: [
          { value: '35+', label: 'Studies' },
          { value: '200+', label: 'Participants' },
          { value: '4', label: 'States visited' },
          { value: '9', label: 'Store visits' },
          { value: '60+', label: 'Hours in store' },
        ],
      },
      metric: {
        title: 'Faster Order Time',
        value: '55',
        unit: '%',
        label: 'Speed increase',
        note: 'A sample size of 10+ users will be used to measure the average order of the same task.',
      },
      activities: {
        title: 'Main activities',
        items: ['White Labeling', 'Usability Testing', 'Workshops'],
        image: { src: img('kfc-pos-activities-board'), alt: 'Workshop sketches and wireframes with notes on the Figma board' },
      },
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
          // The old POS screen recording (Erica's GIF, 2026-11-16). It was a card
          // in the grid at the top of this page until the grid came off on
          // 2026-11-19. She said yes to this spot: after the bucket order
          // paragraph, before the old terminal picture. Tap to play.
          // TODO(Erica): the caption is a first pass.
          {
            type: 'clip',
            src: '/images/case-studies/kfc-pos-old-screen-recording.gif',
            poster: '/images/case-studies/kfc-pos-old-screen-recording-poster.webp',
            alt: 'Screen recording of the old KFC POS. A Famous Bowl in the order is opened on a separate modifier screen and the cheese is removed. An error says an item must be highlighted to make a substitution. After going back to the menu and into the modifiers again, the bowl becomes a Spicy Bowl.',
            caption: 'The old screen. Changing one item meant leaving the order, and an error on the way.',
            ratio: 604 / 418,
            maxWidth: 604,
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
          // Side by side at one height (Erica, 2026-11-21).
          {
            type: 'figures',
            items: [
              { src: img('kfc-pos-figma-wireframe-board'), alt: 'The Figma board for the POS flows', caption: 'The Figma board. Every flow, every state.', ratio: 1910 / 2000 },
              { src: img('kfc-pos-modifier-panel-wireframe'), alt: 'Modifier panel wireframe', caption: 'The modifier panel: quantity, recipe, actions, all in one place.', ratio: 1280 / 2000 },
            ],
          },
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
    // Unused since 2026-11-21: Erica didn't like the result strip. "In short"
    // (`highlights`) is the summary at the top now.
    results: [
      { value: 'Tree view', label: 'shows how menu items relate' },
      { value: 'Action panel', label: 'only the actions for what you selected' },
      { value: 'Diffing', label: 'review a change before it goes live' },
    ],
    // The mark that pops in on this study's Past Work card on hover (Erica, 2026-11-20).
    // Yum is the main mark (top right). Then the brands from this study's home card.
    workLogo: [
      { src: '/images/case-studies/brands/yum.webp', name: 'Yum' },
      { src: '/images/case-studies/brands/pizza-hut.webp', name: 'Pizza Hut', h: 'h-10' },
      { src: '/images/case-studies/brands/kfc.webp', name: 'KFC', h: 'h-7' },
    ],
    homeSection: 'case-studies',
    title: 'Simplifying schemas in menus',
    // What the link on the home card says, so it names the study it opens.
    linkLabel: 'Read the menu case study',
    tagline: "Yum's Menu Management tool, rebuilt around the people who publish menus instead of the API.",
    hero: { src: img('menu-management-final-ui-tree-grid'), alt: 'Menu Management with the tree grid and action panel' },
    // The picture on this study's Past Work card: just the screen, not the
    // one on the black monitor (Erica, 2026-11-20). It floats on the grey, tilted.
    workImage: img('menu-management-final-ui-screen'),
    // Erica, 2026-11-18: the same logos as the home card pop out around this
    // study's blue note in the nav fan on hover. Then she asked for the menu
    // screenshot on the note too. Same picture as the home card's blue sticky.
    // `title` is a shorter name for the note, so the words fit above the picture.
    note: {
      title: 'Simplifying menus',
      image: img('menu-management-final-ui-screen'),
      brands: [
        { name: 'Yum', src: '/images/case-studies/brands/yum.webp', spot: 'top' }, // TODO(Erica): cut out of your mock. Send the real logo file.
        { name: 'KFC', src: '/images/case-studies/brands/kfc.webp', spot: 'left' },
        { name: 'Pizza Hut', src: '/images/case-studies/brands/pizza-hut.webp', spot: 'right' },
      ],
    },
    meta: {
      role: 'Principal UX Designer. I led the UX transformation, ran the research, and facilitated the design studio with API engineers, product owners, and developers.',
      company: 'Yum Brands',
      team: 'Me, API engineers, product owners, developers',
      // From Canon/yum-byte-stats.md (Byte Menu footprint and the GFC keynote, spring 2025).
      // TODO(Erica): confirm the numbers are public.
      scale: '13,000 menu items. Live in 5,925 stores across 4 markets, as of spring 2025',
      tags: ['Admin tool', 'Information architecture', 'Design studio', 'Data grid'],
    },
    // The short version under the role box (Brief in pages/CaseStudyPage.js),
    // added 2026-11-18: before, after, why, and what the evidence is.
    // TODO(Erica): any adoption or time-on-task numbers you can defend go in "Evidence".
    brief: [
      { label: 'Before', text: "To publish a menu you had to understand the API's data model. People were scared to publish, and bulk updates were painful." },
      { label: 'After', text: 'A tree view that shows how menu items relate. A panel that shows only the actions for what you selected. A diff to review before anything goes live.' },
      { label: 'Why', text: 'Each one answers a problem from the interviews and tests. The tree is for seeing relationships, the panel is for finding the right action, and the diff is for checking a change before it reaches stores.' },
      { label: 'Evidence', text: "Interviews, a discovery workshop, a design studio and rounds of prototype testing. I don't have usage numbers from after launch." },
    ],
    // The seven story cards. They tell the engineering story: the schema came
    // first, Erica brought product and engineering to the users, and the team
    // changed course. Copy is from CaseStudy/menu-management.md ("Slides").
    // The same list is the home page strip (data/caseStudiesData.js) and the
    // bento grid at the top of this study's page (StoryGrid in
    // components/caseStudy/Overview.js), in this order.
    //   type   text | art | quote, the card it uses (SlideCard)
    //   look   plain | tint | accent
    //   wide   true for the 544px slides in the home strip
    //   span   columns out of 12 in the page grid, from 1024px up
    slides: [
      {
        type: 'text',
        look: 'tint',
        span: 4,
        title: 'The challenge',
        big: 'To publish a menu you had to understand the API.',
        small: 'Engineering designed the schema, and the screens followed it.',
      },
      {
        type: 'art',
        wide: true,
        span: 8,
        title: 'Bringing them along',
        image: { src: img('menu-management-discovery-workshop-whiteboards'), alt: 'The discovery workshop: a wall of sticky notes and whiteboards mapping menu pricing' },
        caption: 'I brought product and engineering into user interviews and a discovery workshop.',
      },
      {
        type: 'art',
        wide: true,
        span: 6,
        title: 'Engineers sketching',
        image: { src: img('menu-management-design-studio-sketches'), alt: 'Design studio sketches of menu publishing flows with dot votes' },
        caption: 'They drew flows for the people who publish menus, then voted.',
      },
      // The Teams recordings of the Dynamic Action Panel concept sessions
      // (July 2023), from the 2023 Framer page with its drop shadow removed.
      {
        type: 'art',
        wide: true,
        span: 6,
        title: 'Usability testing',
        image: { src: img('menu-management-usability-testing'), alt: 'Recorded usability sessions of the Dynamic Action Panel concept, with transcripts' },
        caption: 'I carried the ideas through prototypes and rounds of user testing.',
      },
      {
        type: 'art',
        wide: true,
        span: 4,
        title: 'What we built',
        // Erica, 2026-11-19: show the whole screen so the full Dynamic Action
        // Panel is in view, circle the panel, and note that it was Figma inspired.
        // `ratio` is the picture's width / height (1200 x 802). `mark` is where
        // the panel sits, in percent of the picture.
        image: {
          src: img('menu-management-final-ui-screen'),
          alt: 'Menu Management: the tree grid on the left and the Dynamic Action Panel on the right, circled',
          ratio: 1200 / 802,
          mark: { left: 83.5, top: 27, width: 17.5, height: 74, note: 'Figma inspired Dynamic Action Panel' },
        },
      },
      // Nathan's quote from the 2023 Framer page, where his Teams card sits
      // under it. Trimmed to two of its sentences; the full quote is in the
      // Outcome section below.
      {
        type: 'quote',
        span: 4,
        title: 'User feedback',
        quote: "Instead of just implementing what we've asked for, you're aiming for a better overall solution... I can see this leading to a significant rewrite of the way we currently do things.",
        who: 'Nathan - KFC Analyst',
        avatar: '/images/case-studies/nathan-shelman.webp',
      },
      {
        type: 'text',
        look: 'accent',
        span: 4,
        title: 'The shift',
        big: 'From API-driven to user-driven.',
        small: 'It changed the trajectory of the team.',
      },
    ],
    summary:
      "Menu Management is the internal tool that decides what's on the menu, what it costs, and where it's sold across every Yum store and channel. I led the UX work to turn it from a screen built around the API's data model into one built around the people who publish menus. Three things came out of it: a tree view that shows how menu items relate, an admin context layer, and a dynamic action panel.",
    // Ported in full from the 2023 Framer page on 2026-11-14 (Erica: "you
    // didn't port everything over"), rewritten to Canon/voice.md. The Framer
    // collages had a drop shadow baked in, stripped in the webp copies here.
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
          // Black on transparent, so it flips to light in dark mode.
          { type: 'figure', src: img('menu-management-challenges'), alt: 'The three problems: fear of negative impact, scalability concerns, and bulk update complexity', invert: true },
        ],
      },
      {
        heading: 'What I did',
        blocks: [
          { type: 'heading', text: 'Understand' },
          {
            type: 'p',
            text: "I started with the people using Menu Management. User interviews and usability tests showed where they got stuck. I brought product and engineering into those interviews so they could hear it from users directly. That's where the team started moving from API-driven design to user-centered design.",
          },
          { type: 'heading', text: 'Research' },
          { type: 'p', text: 'I ran a deep-dive discovery workshop to understand the existing system and hear from the people using it.' },
          { type: 'figure', src: img('menu-management-discovery-workshop-whiteboards'), alt: 'Discovery workshop whiteboards and the pricing model', caption: 'Discovery workshop. The pricing model on the right is where the scale problem lived.' },
          { type: 'heading', text: 'Planning' },
          {
            type: 'p',
            text: "Three goals came out of the workshop: simplify bulk updates, show how menu items relate, and help people understand what they're changing. I picked a design studio for the next step because I wanted everyone working on those goals together.",
          },
          { type: 'heading', text: 'Concept' },
          {
            type: 'p',
            text: 'API engineers, product owners, and developers sketched alongside me instead of reviewing my work after the fact. Everybody drew flows for the two main personas, Manny (updates from the menu) and Chelsea (updates from a store), and we voted. Three ideas came out of it: visualize relationships, admin for context, and a dynamic action panel.',
          },
          { type: 'figure', src: img('menu-management-design-studio-sketches'), alt: 'Design studio sketches with dot votes', caption: 'Design studio. Engineers and product owners sketching, not just reviewing.' },
          { type: 'heading', text: 'Design + Test' },
          { type: 'p', text: 'I built prototypes for each idea and tested them with users in rounds, then changed the design based on what they told us.' },
          { type: 'figure', src: img('menu-management-usability-testing'), alt: 'Recorded usability sessions of the Dynamic Action Panel concept, with transcripts', caption: 'Testing the Dynamic Action Panel concept, July 2023.' },
          { type: 'heading', text: 'Deliver' },
          { type: 'p', text: 'I worked with the dev team to build it into Menu Management: the tree view, admin context, and the action panel.' },
          { type: 'heading', text: 'Learn' },
          { type: 'p', text: 'We kept getting feedback from users and kept refining.' },
        ],
      },
      {
        heading: 'The solution',
        blocks: [
          { type: 'figure', src: img('menu-management-final-ui-tree-grid'), alt: 'Menu Management final UI with the tree grid and action panel', caption: 'The final screen, with the tree grid and the action panel.' },
          { type: 'p', text: "A working menu you can search, expand, and edit in place. It's built on the three ideas from the studio, plus diffing." },
          // Erica, 2026-11-18: a version of the Figma prototype a reader can click
          // around in. Built from the "handoff - Dynamic Action Panel (DAP)" file.
          // TODO(Erica): confirm this can be public, and reword the caption.
          {
            type: 'prototype',
            caption: 'A working version of the action panel flow from my handoff file. The menu items are made up and nothing is saved.',
          },
          { type: 'heading', text: 'Visualize relationships' },
          {
            type: 'p',
            text: 'An advanced data grid with a tree view. Bundle, choice, product, variant, slot, modifier, all nested so you can see how menu items relate and how a change ripples.',
          },
          { type: 'figure', src: img('menu-management-tree-view'), alt: 'The tree grid, from a whiteboard sketch to the final screen', caption: 'The tree grid, from sketch to screen. Nesting shows how menu items relate.' },
          { type: 'heading', text: 'Admin for context' },
          { type: 'p', text: "Show where you are and what you're affecting, so publishing stops feeling like a leap." },
          { type: 'heading', text: 'Dynamic action panel' },
          {
            type: 'p',
            text: 'Select an entity and the panel shows only the actions that apply to it. Nobody has to decode the data model to find the right button. Range pricing lives here too.',
          },
          { type: 'figure', src: img('menu-management-action-panel'), alt: 'Action panel sketches on either side of the final screen', caption: 'Action panel sketches on either side of the final screen. Only the actions for the selected item show.' },
          { type: 'heading', text: 'Diffing' },
          {
            type: 'p',
            text: 'Before anything goes live you see what will change, store by store and channel by channel, so you can catch problems first. Save a patch, review the diff, then publish.',
          },
          { type: 'figure', src: img('menu-management-diffing'), alt: 'Diffing, from a paper sketch to the publishing flow and the review changes screen', caption: 'From a paper sketch to the publishing flow and the review screen. You see every change before it goes live.' },
        ],
      },
      {
        heading: 'Outcome',
        blocks: [
          {
            type: 'quote',
            text: "I know we've asked for a lot of different changes and enhancements to patching, so I appreciate this creative approach. Instead of just implementing what we've asked for, you're aiming for a better overall solution. I like that. We'll need to play with it and see how it works in practice. I can see this leading to a significant rewrite of the way we currently do things.",
            who: 'Nathan Shelman, Analyst at KFC, on seeing the design in review',
            // Shown as his Teams contact card, the way the 2023 Framer page credited him.
            person: {
              card: '/images/case-studies/nathan-shelman-card.png',
              alt: 'Nathan Shelman, Analyst, RIS Kentucky Fried Chicken, Information Technology',
            },
          },
          // Reworded 2026-11-18. The 2023 page stated four results as fact, but no
          // source says they were measured, so this says what each piece was built
          // to change. TODO(Erica): which of these you saw in testing or after launch.
          { type: 'p', text: "That was Nathan's first reaction to the design. As he says, they still needed to use it to see how it works in practice." },
          { type: 'p', text: "What each piece was built to change. These come from the research and the testing rounds. I don't have numbers from after launch." },
          {
            type: 'list',
            items: [
              'The tree view shows how menu items connect, so there is less to work out in your head.',
              'Admin context shows what a change will touch before you publish it.',
              'The action panel shows only what applies, so nobody has to decode the data model to find the right button.',
              'The structure was built for more stores, channels, and pricing rules.',
            ],
          },
        ],
      },
      {
        heading: 'What I learned',
        blocks: [
          {
            type: 'p',
            text: 'This was a team effort. Getting engineers and product owners into the interviews and the design studio meant we were working on the same problem from the start, and testing kept us honest. It showed me design can change how a whole system gets built, and how a team works.',
          },
        ],
      },
    ],
    highlights: [
      'Turned an API-shaped admin tool into a user-shaped one.',
      'Ran a design studio that got engineers and product owners sketching, not just reviewing.',
      'Tree view, action panel, and diffing were built to answer fear, scale, and bulk edits with one model.',
    ],
  },

  {
    slug: 'helix-booking',
    // Erica, 2026-11-21: "put helix booking in the older case studies". It is
    // the first card under "A Peek Into the Past" on Past Work.
    older: true,
    // The mark that pops in on this study's Past Work card on hover (Erica, 2026-11-20).
    // Helix has no logo on file. Erica asked for a hair salon icon: scissors.
    workLogo: { icon: 'scissors', name: 'Hair salon' },
    linkLabel: 'Read the Helix Booking case study',
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
          // Erica, 2026-11-20: Helix has not launched yet.
          { type: 'p', text: 'We planned to open a beta in early 2024 to get real feedback from early users before going wider. It has not launched yet.' },
        ],
      },
    ],
    highlights: [
      'Started a product from zero with two developers and no budget.',
      'Owned a two-platform design system built on native components.',
      'Ran product process for a tiny team so it actually shipped.',
    ],
  },
  // Grier Forensics, through Bitovi, 2020. Source: CaseStudy/grier-forensics.md,
  // drafted 2026-11-21 from Assets/grier/ and Erica's answers in chat. Title is
  // hers. It sits above the credit limit study in
  // the older section of Past Work (her ask), so it comes first in this list.
  // Erica confirmed on 2026-11-21 that the screens are sample data and that
  // the storyboard and journey map can be public.
  // TODO(Erica): whether the product's name can be used (it is left off the
  // page, and the pictures that show it are not used); the dates (she said
  // 2020, the files run December 2020 to January 2021).
  {
    slug: 'grier-forensics',
    // Unused since 2026-11-21: Erica didn't like the result strip. "In short"
    // (`highlights`) is the summary at the top now.
    results: [
      { value: '6 weeks', label: 'from interviews to a tested prototype' },
      { value: '17 features', label: 'in the MVP, with 16 more phased for later' },
      { value: 'Built', label: 'and the connections helped solve cases' },
    ],
    older: true,
    // Erica, 2026-11-21: "the grier case study was done at bitovi so add that
    // logo". Bitovi is the main mark, like CGI on the client studies, and the
    // magnifying glass hangs off the bottom left. The logo is from bitovi.com.
    workLogo: [
      { src: '/images/case-studies/brands/bitovi.svg', name: 'Bitovi', h: 'h-5', wide: true },
      { icon: 'search', name: 'Forensics', spot: 'bottomLeft' },
    ],
    linkLabel: 'Read the AI forensics case study',
    // 2026-11-21: Erica asked for a more interesting title than "AI forensics
    // before AI", gave her own wording, then took this shorter version of it.
    title: 'Connecting forensic cases with AI before it was popular',
    tagline: 'Screens that show how one forensic case connects to another. Six weeks, 2020.',
    hero: { src: img('grier-related-cases-tablets'), alt: 'Two tablets showing the related cases screen, as a diagram of links and as a table', position: 'center' },
    meta: {
      role: 'Sole UX designer',
      company: 'Grier Forensics, through Bitovi',
      years: '2020, six weeks',
      team: 'Me, the product owner and the developers',
      tags: ['UX research', 'Journey mapping', 'Prototyping', 'AI'],
    },
    summary:
      'I was the sole UX designer on a six week project for Grier Forensics, through Bitovi. They were building a tool that finds connections between forensic cases. A person, a phone number or a chemical that shows up in one case might show up in another. My job was to learn how the people who do this work think. Then I designed the screens that show them those connections.',
    sections: [
      {
        heading: 'The problem',
        blocks: [
          {
            type: 'p',
            text: 'Evidence gets collected at a site, carried to a lab, laid out on tables, tagged and processed. Then someone has to read through all of it and work out what story it tells.',
          },
          {
            type: 'figure',
            src: img('grier-storyboard'),
            alt: 'Four sketched frames: site exploitation, evidence processing and custody tracking, analyzing the evidence, and building a report or brief',
            caption: 'My storyboard of one case, from the site to the brief.',
          },
          {
            type: 'p',
            text: 'That last part was the hard part. The low point on my journey map is the line "Combing through the evidence is strenuous and complicated." Notes went on paper and a whiteboard, and at the end someone built a PowerPoint to brief a commander.',
          },
          {
            type: 'figure',
            src: img('grier-journey-map'),
            alt: 'A journey map for a team leader across site exploitation, evidence processing and analysis, with feelings, actions and mindset',
            caption: 'The journey of a team leader, before the tool.',
          },
        ],
      },
      {
        heading: 'What I did',
        blocks: [
          { type: 'heading', text: 'Learn the work' },
          {
            type: 'p',
            text: 'I did desk research, ran a round table session and interviewed users. Then I drew what I heard as the storyboard and the journey map above.',
          },
          { type: 'heading', text: 'Put the product on the journey' },
          {
            type: 'p',
            text: 'I drew the journey again with the points where the tool could help. That gave us a flow built on three things they ask. What types of connections were found, is this relevant to my case, and what makes this connection strong. Then they document it.',
          },
          {
            type: 'figure',
            src: img('grier-user-flow'),
            alt: 'A flow diagram that starts with an alert for a new connection and branches on whether it is relevant, with sticky notes for features',
            caption: 'The flow for a new connection, with feature ideas on stickies.',
          },
          { type: 'heading', text: 'Cut it down to an MVP' },
          {
            type: 'p',
            text: 'I turned the flow into a backlog in Notion. 17 features made the MVP. 11 went to phase 2 and 5 to phase 3. Alerts, export and a map view all waited.',
          },
          {
            type: 'figure',
            src: img('grier-backlog'),
            alt: 'A Notion board of features in three columns: MVP with 17, Phase 2 with 11, Phase 3 with 5',
            caption: 'The backlog, split into MVP, phase 2 and phase 3.',
            frame: true,
          },
          { type: 'heading', text: 'Design and test' },
          {
            type: 'p',
            text: 'I designed four screens, built a click through prototype at medium fidelity and ran usability tests on it. We had a weekly check-in with the client.',
          },
          // Erica, 2026-11-21: "it stayed intentionally wireframed so we can move
          // fast and use the microsoft design system since military thats what
          // they used".
          {
            type: 'p',
            text: 'The screens stayed as wireframes on purpose. That let us move fast. The developers could build with the Microsoft design system, because that\'s what the military used.',
          },
          // Erica's screenshot of a session, sent 2026-11-21 ("add this
          // screenshot doing usability testing"). It shows her and one other
          // person on camera. TODO(Erica): the caption is a first pass.
          {
            type: 'figure',
            src: img('grier-usability-testing'),
            alt: 'A video call with the wireframes for the related cases screen shared on screen, and two people on camera',
            caption: 'Usability testing on the wireframes, over a video call.',
          },
          {
            type: 'clip',
            src: '/images/case-studies/grier-drill-down.gif',
            poster: '/images/case-studies/grier-drill-down-poster.png',
            alt: 'A recording of the prototype, drilling from a case into one of its entities',
            caption: 'Drilling from a case into an entity. Tap to play.',
            ratio: 1026 / 1038,
            maxWidth: 520,
            center: true,
          },
        ],
      },
      {
        heading: 'The solution',
        blocks: [
          { type: 'heading', text: 'Dashboard' },
          {
            type: 'p',
            text: 'A list of active cases with the date, the location and a favorite tag. One table and a search box.',
          },
          {
            type: 'figure',
            src: img('grier-dashboard'),
            alt: 'The dashboard: a table of active cases with date, location and tags',
            maxWidth: 560,
            frame: true,
          },
          { type: 'heading', text: 'Case view' },
          {
            type: 'p',
            text: 'Everything about one case: the details, the photos and a list of every piece of evidence, called entities. Each entity has a weight, a type and where it came from. It also shows how many times it turns up and which other cases it\'s in.',
          },
          {
            type: 'figure',
            src: img('grier-case-details'),
            alt: 'The case view: case details, a photo grid, and a sortable list of entities',
            maxWidth: 440,
            frame: true,
          },
          { type: 'heading', text: 'Related cases' },
          {
            type: 'p',
            text: 'Cases that share entities with this one. There are two ways to look at it. Grid view is a table you can sort and search. Link view draws the target case, the entities it shares and the cases those lead to. "Tables vs mind map" was the first item in the backlog, and the answer was both.',
          },
          {
            type: 'figure',
            src: img('grier-related-cases-link-view'),
            alt: 'Link view: the target case at the top, shared entities under it, and lines down to two other cases',
            caption: 'Link view.',
            maxWidth: 520,
            frame: true,
          },
          {
            type: 'figure',
            src: img('grier-related-cases-grid-view'),
            alt: 'Grid view: a small tree of shared entities beside a table of related cases with counts',
            caption: 'Grid view.',
            maxWidth: 520,
            frame: true,
          },
          { type: 'heading', text: 'Entity view' },
          {
            type: 'p',
            text: 'One person, email or chemical across every case. Each row shows the case, where it was found and a snippet with the match highlighted. It also has the file, the software that read it and a confidence score. A match at 98% and a match at 14% sit in the same table, so both are there to see.',
          },
          {
            type: 'figure',
            src: img('grier-entity-occurrences'),
            alt: 'The entity view: a table of every place one person shows up, with a confidence percentage on each row',
            caption: 'Every match has a confidence score.',
            maxWidth: 520,
            frame: true,
          },
        ],
      },
      {
        heading: 'Outcome',
        blocks: [
          {
            type: 'p',
            text: 'The team built it. The connections it found helped solve cases.',
          },
          {
            type: 'p',
            text: 'They created an LLM before AI was something most people talked about. The designs gave the developers something to build to.',
          },
        ],
      },
      {
        heading: 'What I learned',
        blocks: [
          {
            type: 'list',
            items: [
              'How to design for AI before it was popular.',
              'How to work with ambiguity.',
              'How to work with highly sensitive information.',
            ],
          },
        ],
      },
    ],
    highlights: [
      'Sole UX designer on a six week project, from interviews to a tested prototype.',
      "Designed how an LLM's matches are shown, with a confidence score on each one.",
      'The team built it, and the connections helped solve cases.',
    ],
  },
  // An older study, from Alliance Data (now Bread Financial). Source:
  // CaseStudy/credit-limit-increase.md, drafted 2026-11-20 from Erica's Framer
  // page at /CLI and the pictures she sent. Open questions are at the top of
  // the markdown. TODO(Erica): the outcome numbers. Her spreadsheet picture
  // dates the 203K requests to Jan-Jun 2017 on the web, which may be the
  // baseline, not the result. Her sentence is used as written until she checks.
  // TODO(Erica): the title is a first pass. No Years row until she gives dates.
  {
    slug: 'credit-limit-increase',
    // Erica, 2026-11-20: this one goes at the bottom of Past Work under an
    // "Older Work" heading, so readers know it is more than five years old.
    older: true,
    workLogo: { src: '/images/case-studies/brands/bread-financial.png', name: 'Bread Financial', h: 'h-5' },
    linkLabel: 'Read the credit limit increase case study',
    title: 'Asking for a higher credit limit',
    tagline: "Alliance Data, now Bread Financial. A way to ask for a credit limit increase inside a store brand's app.",
    // `position` centers the phone in the Past Work card's picture (her ask).
    hero: { src: img('cli-hero-phone'), alt: "The credit limit increase prompt on the Victoria's Secret card screen", position: 'center' },
    meta: {
      role: 'Lead interaction designer. I validated the user requirements and designed a feature that was easy to use, delightful, and feasible to build.',
      company: 'Alliance Data, now Bread Financial',
      team: 'A product owner, a development team, and me',
      tags: ['Mobile app', 'White label', 'User research', 'Credit cards'],
    },
    summary:
      "Cardmembers assumed their credit limit would go up on its own if they were good customers. In 2017 it didn't work that way. They had to ask. I was the lead interaction designer on the feature that told eligible cardmembers they could ask, and let them do it inside the store's app.",
    sections: [
      {
        heading: 'The problem',
        blocks: [
          {
            type: 'p',
            text: 'Our customer journey research found that cardmembers assume the credit provider will raise their limit automatically if they are seen as a valuable customer. This mattered most to the cardmembers we called credit builders.',
          },
          {
            type: 'quote',
            text: 'Cardmembers assume the credit issuer will automatically increase their credit if they are seen as a valuable customer.',
            who: 'Customer journey research',
          },
          {
            type: 'p',
            text: "In 2017 the product didn't work that way. A cardmember had to request an increase, and nothing in our channel told the people who might qualify that they could.",
          },
          {
            type: 'p',
            text: 'The question we set: how might we generate credit limit increase revenue and boost spending for customers who want to build credit for critical purchases?',
          },
          {
            type: 'figure',
            src: img('cli-journey-research'),
            alt: 'The store card journey map, its insights, and a remote live conversation',
            caption: 'The journey map, the insight about credit limits, and a remote live conversation.',
          },
        ],
      },
      {
        heading: 'What I did',
        blocks: [
          { type: 'heading', text: 'Understand' },
          {
            type: 'list',
            items: [
              'Went through the customer journey research.',
              'Pulled the user quotes that showed what motivates someone to make the request, and how people saw credit limit increases in general.',
              'Reviewed the web experience to learn how applying for an increase worked at the time.',
              'Aligned stakeholders on the research about the customer.',
              'Interviewed stakeholders to hear past views on the feature.',
              'Reviewed the business requirements and scope.',
            ],
          },
          { type: 'heading', text: 'Research' },
          {
            type: 'p',
            text: 'I pulled together all the past research so we knew what we had to get right. Questions that came up along the way were written down and answered with more research: remote live conversations and remote usability testing. From that I made user scenario storyboards to guide the design.',
          },
          {
            type: 'figure',
            src: img('cli-scenario-storyboards'),
            alt: 'A user scenario storyboard and the screen flows',
            caption: 'A scenario storyboard, and the flows that came from it.',
          },
          { type: 'heading', text: 'Concept' },
          {
            type: 'p',
            text: "Now we knew what people wanted. The next question was how the request should feel. I wanted people to be excited to ask, and excited if they got it. If they didn't get it, the experience had to respect how that feels and still leave them feeling appreciated.",
          },
          {
            type: 'figure',
            src: img('cli-concept-wireframes'),
            alt: 'Four wireframes of the account screen',
            caption: 'Four versions of the account screen. Each one tells the cardmember about the increase in a different way.',
          },
          { type: 'heading', text: 'Design' },
          {
            type: 'p',
            text: 'High fidelity and testing. We tested the full experience, picked the concepts that tested best, and built those.',
          },
          // Erica's recording from the Framer page (2026-11-20: the first file she
          // sent was a still). 210 by 420, about 26 seconds. Tap to play.
          // TODO(Erica): the caption and the description are a first pass.
          {
            type: 'clip',
            src: '/images/case-studies/cli-design-in-app.gif',
            poster: '/images/case-studies/cli-design-in-app-poster.png',
            alt: "A recording of the Victoria's Secret app on a phone, moving through the feature",
            caption: "The feature in the Victoria's Secret app. Tap to play.",
            ratio: 210 / 420,
            maxWidth: 240,
            center: true,
          },
          { type: 'heading', text: 'Deliver' },
          {
            type: 'p',
            text: 'We were confident people could do three things: understand the experience, get through it with ease, and come away feeling good whether or not they got the increase.',
          },
          {
            type: 'figure',
            src: img('cli-zeplin-spec'),
            alt: 'The approved screen in Zeplin with notes for developers',
            caption: 'The approved screen in Zeplin, with my notes for the developers.',
          },
          { type: 'heading', text: 'Support' },
          {
            type: 'p',
            text: 'The product owner and I guided the development team through the build. I made icons and extra flows as they were needed. The design spec lived in Zeplin and kept changing through development, which left room to end up with the best experience we could.',
          },
        ],
      },
      {
        heading: 'What made it hard',
        blocks: [
          {
            type: 'points',
            items: [
              { title: 'New animations.', text: 'We wanted delightful ones, and there were technical limits on what we could do.' },
              { title: 'How hard to advertise.', text: 'We had to decide how loudly to tell people about the feature.' },
              { title: 'An app within an app.', text: "The feature is a plugin that lives inside the client's app, which made every ask harder to build." },
              { title: 'White label.', text: "One solution had to take on each brand's style and voice." },
            ],
          },
        ],
      },
      {
        heading: 'The solution',
        blocks: [
          {
            type: 'p',
            text: 'Eligible cardmembers got a subtle but clear way to learn about the feature, and more requests succeeded. That helped the business. It also gave cardmembers the buying power for the item that was just within reach, while they built their credit. Something people assumed was automatic became something they knew to ask for.',
          },
        ],
      },
      {
        heading: 'Outcome',
        blocks: [
          // TODO(Erica): check these numbers. See the note above this study.
          {
            type: 'p',
            text: 'There were about 203,000 requests after launch and two thirds of them were approved. We almost doubled our requests and our success rate.',
          },
          {
            type: 'figure',
            src: img('cli-results-data'),
            alt: 'Spreadsheets of credit limit increase requests by card tier, decline reason, and device',
            caption: 'Requests by card tier, decline reason, and device.',
          },
        ],
      },
      {
        heading: 'What I learned',
        blocks: [
          {
            type: 'p',
            text: 'What users assume can hurt their experience with a brand, and it can hurt the business too. This project showed me how much it matters to understand them.',
          },
        ],
      },
    ],
    highlights: [
      'Found the gap in research: people thought increases were automatic.',
      "Designed one white label flow that lives inside each store brand's app.",
      'About 203,000 requests after launch, two thirds approved.',
    ],
  },
  // The leadership story. Source: CaseStudy/yum-ux-leadership.md, imported
  // 2026-11-16 from Erica's Claude doc. Every [Confirm] in the doc is a
  // TODO(Erica) in the markdown and its sentence is left out here. No hero
  // and no pictures yet: the doc's pictures need names and faces blurred, and
  // the Byte slides are internal. It sits last, so the nav fan (first three
  // studies) doesn't change.
  {
    slug: 'yum-ux-leadership',
    // Unused since 2026-11-21: Erica didn't like the result strip. "In short"
    // (`highlights`) is the summary at the top now.
    results: [
      { value: '18', label: 'direct reports' },
      { value: '1 quarter', label: 'design involved ahead of implementation' },
      { value: '4 brands', label: 'in the field research I planned' },
    ],
    // The mark that pops in on this study's Past Work card on hover (Erica, 2026-11-20).
    workLogo: { src: '/images/case-studies/brands/yum.webp', name: 'Yum' },
    linkLabel: 'Read the Yum leadership case study',
    homeSection: 'leadership',
    title: 'Leading UX at Yum Brands',
    tagline: 'How I set the direction for design, built the way the team worked, and took research into stores.',
    // Erica, 2026-11-18: the Yum logo pops out of this study's yellow note in the nav fan on hover.
    note: {
      brands: [
        { name: 'Yum', src: '/images/case-studies/brands/yum.webp', spot: 'top' }, // TODO(Erica): cut out of your mock. Send the real logo file.
      ],
    },
    meta: {
      // TODO(Erica): exact starting title, and how long until the promotion.
      role: 'Joined as a senior designer, promoted to UX Manager and Principal Product Designer. I led the design strategy for Byte, the way the team worked, and the plan for field research across four brands.',
      company: 'Yum Brands (KFC, Taco Bell, Pizza Hut, Habit Burger)',
      years: 'March 2022 to September 2025',
      // Erica, 2026-11-23: the count was wrong at six. She had two teams, designers
      // and researchers, and everyone in the table below reported to her: 18.
      team: '18 direct reports on two teams: 16 designers across six product areas, and 2 researchers. Partners in product, engineering, brand operations and an outside research partner',
      tags: ['Leadership', 'Design ops', 'Design strategy', 'Field research'],
    },
    // The cards at the top of this page are the two product case studies from
    // the same company (Erica, 2026-11-16), so someone who lands here first
    // still sees that work. Any study can list `related` slugs.
    related: { label: 'Case studies from my time at Yum', slugs: ['menu-management', 'yum-pos'] },
    // The short version under the role box (Brief in pages/CaseStudyPage.js),
    // added 2026-11-18. Every line is cut from the sections below.
    // TODO(Erica): the last line says there are no product metrics tied to this
    // work, because none are in your doc. Change it if you have some.
    brief: [
      { label: 'The problem', text: 'UX reported into engineering and came in after the decisions were made. Designers were spread across products with no shared way of working, right as Yum planned to bring its restaurant tools into one platform, Byte.' },
      { label: 'My role', text: 'UX Manager and Principal Product Designer, with 18 direct reports on two teams, designers and researchers. I owned the design direction for Byte, how the team worked, and the plan for field research.' },
      { label: 'Who I worked with', text: 'Product owners, engineering, brand operations, our design director, and an outside research partner who ran the store sessions.' },
      { label: 'Scope and status', text: 'The intake checklist, the Jira workflow and the critiques were how the team ran. For Byte I proposed four workstreams. The store research one went ahead as Project Keystone.' },
      { label: 'Key decisions', text: 'A checklist every request had to pass before design took it on. Critiques at 30, 60 and 90. For menu reverts, undo the whole publish in the first version and write down the risks.' },
      { label: 'What I can stand behind', text: "Design got involved a full quarter ahead of implementation, and bulk change requests moved into one workflow. These are changes in how we worked. I don't have product metrics tied to them." },
    ],
    summary:
      'I joined Yum as a senior designer. UX reported into engineering and got pulled in after the decisions were made. I saw that the team needed someone to lead, so I stepped up, and I was quickly promoted to manager. Designers were spread across products with no shared way of working. Yum was also about to bring many separate restaurant tools together into one platform, Byte.',
    sections: [
      {
        heading: 'At a glance',
        blocks: [
          {
            type: 'p',
            text: 'I set the direction for how design should support that move. I built the system the team ran on, from intake to handoff. And I pushed for research in real stores so we were designing from what we saw firsthand. By the time Byte was shown to franchisees as one platform, design was already working as one team.',
          },
          {
            type: 'table',
            caption: 'My direct reports, by product area. 16 designers and 2 researchers.',
            head: ['Area', 'People'],
            rows: [
              ['Byte Coach', '8'],
              ['Menu', '2'],
              ['POS', '2'],
              ['Store Ops', '2'],
              ['Dragontail', '1'],
              ['Design System', '1'],
              ['Research', '2 researchers'],
            ],
          },
          // Page 3 of Assets/Yum/Byte Coach.pdf, an internal deck (Erica picked it, 2026-11-16).
          // TODO(Erica): confirm it can be public, and say which of these apps your designers worked on.
          {
            type: 'figure',
            src: img('byte-coach-app-map'),
            alt: 'A map of Byte Coach: the Manager App, the ARL App with audit, the TM App, the Restaurant Hub and the Admin Tool, each with its main features, plus communication and recognition touchpoints across the app.',
            caption: "Byte Coach, the product area with the most people on the team. From Yum's Byte Coach overview.",
          },
        ],
      },
      {
        heading: 'The challenge',
        blocks: [
          // TODO(Erica): confirm the design had to be redone. The doc wrote it that way.
          {
            type: 'p',
            text: "One moment showed me the problem. We had finished a design, and then found out the API couldn't support it. The menu data had items nested so deep there was no flexibility to edit them. Nobody had looked at that together before design started, so the work had to be redone.",
          },
          { type: 'p', text: "That wasn't a one-off. It came from how the work was set up:" },
          {
            type: 'points',
            items: [
              { title: 'Design came in late.', text: 'UX reported into engineering, and product and dev often decided what to build before we were involved.' },
              { title: 'No shared way of working.', text: 'Requests showed up without a clear problem, user goals, or technical constraints. Research, critique, and validation depended on who was running the project.' },
              { title: 'Iteration made us look slow.', text: 'When we found problems late, we went around again and again. From the outside, UX looked like the bottleneck.' },
              { title: 'A bigger change was coming.', text: "Yum's restaurant tools ran on separate products, each with its own tech stack and components. The plan was to bring them together into one platform, Byte, and take it to international markets. Design wasn't set up to support that." },
            ],
          },
        ],
      },
      {
        heading: '1. Setting the direction',
        blocks: [
          // TODO(Erica): what the North Star plan covered and who approved it.
          { type: 'p', text: 'I started with a North Star plan for UX at Yum. It made the case for bringing designers into one team, defined roles and responsibilities, and mapped how work actually moved.' },
          { type: 'p', text: 'Then I looked ahead to Byte. Taking separate products, each with its own stack and components, into new markets would mean low adoption and higher costs. The products had to feel like one system first. I laid out what design would need to make that possible, as four workstreams leadership could fund one at a time.' },
          { type: 'diagram', name: 'workstreams', caption: 'Design strategy for Byte, the four workstreams I proposed' },
          // TODO(Erica): your role in writing the proposal, and what happened to the other three workstreams.
          { type: 'p', text: 'The order mattered. First learn what exists and who uses it, then build the shared system and the team to support it. The store research piece went ahead as Project Keystone.' },
        ],
      },
      {
        heading: '2. Building how the team works',
        blocks: [
          { type: 'p', text: 'A direction only matters if the day-to-day work changes. I built the system the team ran on, piece by piece.' },
          { type: 'heading', text: 'A clear front door' },
          { type: 'p', text: 'I wrote a PRD UX Checklist for product owners. It was a short list of yes or no questions a request had to pass before design took it on: a problem statement that doesn\'t prescribe the solution, a check-in with dev, user goals, priorities, use cases, business goals, technical constraints, and history. It took "is this ready for design?" out of opinion.' },
          { type: 'heading', text: 'One path from kickoff to handoff' },
          { type: 'p', text: 'I set up a design workflow in Jira. When one step was done, the next story was created automatically, so every project moved through the same stages. Three critiques were built in, at 30, 60, and 90, so feedback happened at set points instead of at the end.' },
          { type: 'diagram', name: 'workflow', caption: 'Design workflow, intake to handoff' },
          { type: 'heading', text: 'One place to see all the work' },
          // TODO(Erica): confirm you set up this board. The Jira board GIF goes here once names, avatars and the company URL are blurred.
          { type: 'p', text: 'Every request lived on one UX Discovery board, grouped by designer, with a target quarter, "spec ready" and "designs ready" checks, and delivery progress. Views for triage, capacity planning, impact assessment, and product planning sat alongside it.' },
          { type: 'heading', text: 'Working with product and engineering' },
          { type: 'p', text: 'The triad in action. When KFC users needed a way to undo a bad menu publish, I pulled together a task force: a UX designer, a front-end dev, a back-end dev, and me filling in as product owner. The goal was to agree on use cases and define next steps.' },
          {
            type: 'steps',
            items: [
              { title: 'Clarify the problem', text: 'We met with KFC users to hear the problem in their words, then wrote it up as a PRD.' },
              { title: 'Cut scope early', text: 'We marked related stories "won\'t fix" or "don\'t do this yet," so the team stayed focused on the core need.' },
              { title: 'Decide together', text: 'For the first version, reverts happen at the level of the whole menu publish, not each store channel. We also limited reverts to recent publishes. We wrote down the risks: bringing back stale menus, people treating revert as routine instead of an emergency fix, and the cost of storing old menus.' },
              { title: 'Validate before building', text: 'At the first triad review, the team liked the flow but flagged it for testing. We ran usability tests. At the next review, the triad agreed: aligned.' },
              { title: 'Hand off clearly', text: 'Each role left with its next step: product updated the epic and acceptance criteria, the devs wrote their stories, and the designer added a new "restored" status.' },
            ],
          },
          { type: 'p', text: "That's the whole system working: a clear problem, early dev input, testing before build, and one aligned iteration." },
          { type: 'heading', text: 'Growing people' },
          // TODO(Erica): whether you wrote the framework or adapted an existing Yum one.
          { type: 'p', text: 'Designers need to see a path forward. The UX career framework laid out five levels, from UX I through Senior UX II, then Principal or Manager, with separate tracks for design and research. Each level spelled out what good looks like across the same areas:' },
          {
            type: 'list',
            items: [
              'How complex the work is and how you approach it',
              'How independently you work',
              'Execution',
              'Strategy, communication, and influence',
              'Leadership and culture',
              'Design or research skills',
              'What it takes to move up',
            ],
          },
          { type: 'p', text: 'At the top, it splits into two paths: Principal for people who want to stay hands-on, and Manager for people who want to lead a team. A manager and IC 1:1 template gave each designer a regular space to work toward the next level.' },
        ],
      },
      {
        heading: '3. Getting buy-in',
        blocks: [
          { type: 'p', text: 'None of this landed on day one. Everyone pushed back, and it took a long time.' },
          {
            type: 'points',
            items: [
              { title: 'Product owners.', text: "The checklist felt like a gate. What turned it around was a workshop that started as a retro. Looking back at real projects together, I could show that we'd move faster by aligning up front and going through one iteration, not twelve. All those rounds were what made UX look slow." },
              // TODO(Erica): what the workshop caught early. The workshop photo goes here once faces and prices are blurred.
              { title: 'Engineering.', text: 'Getting dev in early took more than an invite. I required them to come to a working workshop. In the room, we mapped menu publishing and pricing scenarios together, wrote "How might we" statements for real roles, and agreed on what was in and out of scope.' },
              // TODO(Erica): "My designers" is a [Confirm] in the doc with no text yet, so it is not here.
              // TODO(Erica): what you asked leadership for, and whether your work helped make the case for the director role.
              { title: 'Leadership.', text: 'UX started out reporting into engineering. Over time, Yum hired a design director.' },
            ],
          },
        ],
      },
      {
        heading: '4. Grounding it in stores',
        blocks: [
          { type: 'p', text: "Byte was making big product bets without enough ground truth from stores. As I put it in the exec pitch: if we don't build what stores need, they won't adopt it. Project Keystone was the field study to fix that, across Pizza Hut, KFC, Taco Bell, and Habit Burger." },
          { type: 'heading', text: 'Making the case' },
          { type: 'p', text: 'The pitch tied research to the numbers leadership cared about: operating profit, order value, labor cost, and order speed. It asked for introductions to franchisees and ops leaders, field access, and visible support for design as a strategic capability. We had sponsors from two brands plus Byte product and design leadership.' },
          { type: 'heading', text: 'Running it' },
          { type: 'p', text: 'I led and owned the project plan. An outside research partner ran the sessions. Our design director owned leadership alignment and escalations. I:' },
          {
            type: 'list',
            items: [
              'Built the master plan and tracker for store visits and interviews',
              'Set a weekly rhythm for status, risks, and next steps',
              'Ran working sessions with the vendor, and reviewed their work before it went wider',
              'Worked with Ops, Legal, HR, Security, and brand leaders to get store access',
              'Rotated my designers through interviews so they saw stores firsthand',
              'Set a standard way to document every visit, from planning to summary',
            ],
          },
          // "The plan": the doc records what was planned. TODO(Erica): say what was carried out and what came of it.
          { type: 'heading', text: 'The plan' },
          { type: 'p', text: 'The plan was three stores per brand, shadowing general managers, shift managers, and team members through opening, peak, and close, plus virtual interviews with franchise owners, data managers, and above-store leaders.' },
          { type: 'p', text: 'The questions were written for each role. A general manager was asked about balancing labor, digital orders, and profit. A shift manager: "What defines a successful shift for you?" A team member: "If you could improve one thing about the systems you use, what would it be?"' },
          { type: 'diagram', name: 'keystone', caption: 'Project Keystone, planned phases by week' },
          // TODO(Erica): what came out of it. Which deliverables were finished, and one roadmap decision the research changed.
        ],
      },
      {
        heading: '5. Where it led',
        blocks: [
          { type: 'p', text: 'This change in process set us up to support what came next. By April 2025, Byte was describing itself as one platform replacing a set of separate products. A shared intake, one workflow, and regular critiques meant design could already work across those products as one team.' },
          // The five slides the doc shows here, rendered from the PDFs in Assets/Yum
          // (Erica: "bring over the images and assets from the PDF"). They are internal
          // Yum decks. TODO(Erica): confirm they can be public before this is pushed.
          { type: 'figure', src: img('byte-old-way-vs-now'), alt: "A Byte slide. The old way: eight separate products, like Commerce Platform, Dragontail, Poseidon, Menu Management and SuperApp. Now and the future: Byte by Yum, AI-powered, all-in-one, turnkey.", caption: "From Yum's Byte deck, April 2025" },
          { type: 'figure', src: img('byte-vision'), alt: 'A Byte slide. Byte vision: to become the essential operating system powering exceptional restaurant performance, customer experiences, and profitable growth.' },
          { type: 'p', text: "That same year, Byte was introduced to franchisees at Yum's Global Franchise Conference. The message lined up with what we'd built for: one system in place of too many tools, and products that feel the same, so being trained on one means you can use them all." },
          { type: 'figure', src: img('byte-too-many-tools-vs-one-platform'), alt: 'A conference slide. Too many tools: data in silos, disconnected operations, slower decision making, higher total cost of ownership. One seamless platform: data that flows, easier operations, better and faster decisions, lower total cost of ownership.', caption: "From the Digital and Technology keynote at Yum's Global Franchise Conference, 2025" },
          { type: 'figure', src: img('byte-trained-in-one'), alt: 'A conference slide showing Byte on a tablet, a phone and a laptop, with the line "Trained in one, ease across all."' },
          { type: 'figure', src: img('byte-legacy-pos-vs-byte-pos'), alt: 'A conference slide. The legacy Taco Bell point of sale next to the new Byte Point of Sale, under the line "Byte creates a more seamless experience for team members in store".' },
          { type: 'heading', text: 'What I can stand behind' },
          // TODO(Erica): one concrete example. Did the new POS or Menu Management go through your workflow?
          {
            type: 'list',
            items: [
              'Design got involved a full quarter ahead of implementation.',
              'Bulk change requests were combined into one streamlined workflow, which cut time to market.',
              // TODO(Erica): what the accessibility work was. This wording does not claim an audit.
              'We worked toward WCAG 2.1 across product lines.',
            ],
          },
        ],
      },
      {
        heading: 'What I learned',
        blocks: [
          // TODO(Erica): add one thing you'd do differently.
          {
            type: 'points',
            items: [
              { title: 'Alignment is the fast path.', text: 'The retro workshop proved it. One aligned iteration beats many fast ones, and showing people their own history convinced them more than any process doc.' },
              { title: 'Sometimes you have to require it.', text: "Invitations didn't get engineering into the room. Making the working workshop required did." },
              { title: 'Good process carries a team through big change.', text: "The checklist, workflow, and critiques were built for day-to-day work. They're also what let design keep up when Byte brought everything together." },
              { title: 'Go see the work.', text: "Planning field research across four brands showed me how much the best product decisions depend on how stores actually run day to day. That's stayed with me, and it's at the center of what I'm building now with Ariso." },
            ],
          },
        ],
      },
    ],
    // TODO(Erica): these four are cut from the text above. Reword as you like.
    highlights: [
      'Joined Yum as a senior designer and was promoted to lead UX.',
      'Built how the team worked: a checklist at intake, one Jira workflow, critiques at 30, 60 and 90.',
      'Proposed four workstreams to turn many products into one platform.',
      // TODO(Erica): "a quarter earlier" moved to the short version until you give the comparison behind it.
      'Owned the plan for Project Keystone, a field study in stores across four brands.',
    ],
  },
  // Topstep. Source: CaseStudy/topstep.md, drafted 2026-11-19 from Erica's
  // Claude doc "Cutting dropped trade data by 100% at Topstep". The words are
  // hers. No hero and no pictures: the doc's three "Visual:" notes (a header,
  // the cross-pod framework, outcome cards) don't exist yet. The four diagrams
  // are redrawn in components/caseStudy/Diagrams.js.
  // The 100% and "zero" stay: Erica, 2026-11-19, "Yes, keep it".
  // The end date is April 2026 (Erica, same day). The phases diagram stops in
  // February; what came after is not said on the page.
  // The team of 6 were Topstep engineers (Erica, same day).
  // TODO(Erica), listed in the markdown: whether this much about Topstep can
  // be public. Not pushed.
  {
    slug: 'topstep',
    // Unused since 2026-11-21: Erica didn't like the result strip. "In short"
    // (`highlights`) is the summary at the top now.
    results: [
      { value: '0', label: 'dropped trades after the migration' },
      { value: '6', label: 'Topstep engineers on the team' },
      { value: 'Side by side', label: 'old and new ran together, with flags to roll back' },
    ],
    // The mark that pops in on this study's Past Work card on hover (Erica, 2026-11-20).
    // The wordmark from topstep.com is white, so it sits on a dark chip.
    // Erica, 2026-11-20: tie this study back to CGI. The CGI logo is its
    // second mark on Past Work, and its page opens with a link to the CGI study.
    // Erica, 2026-11-21: "switch CGI and icon placement, same for topstep". CGI
    // is the main mark in the top right corner now and the client's mark hangs
    // off the bottom left.
    workLogo: [
      { src: '/images/case-studies/brands/cgi.png', name: 'CGI', h: 'h-6' },
      { src: '/images/case-studies/brands/topstep-white.png', name: 'Topstep', chip: 'dark', spot: 'bottomLeft' },
    ],
    // The CGI study, and the other client study beside it (Erica, 2026-11-20).
    related: { label: 'More from my work at CGI', slugs: ['cgi-leadership', 'aerospace-program'] },
    homeSection: 'leadership',
    title: 'Cutting dropped trade data by 100% at Topstep',
    tagline: 'From daily trade loss to zero dropped trades.',
    linkLabel: 'Read the Topstep case study',
    meta: {
      role: 'Product leader, leading an engineering team of 6. My focus was strategy, alignment, prioritization, and delivery.',
      company: 'Topstep, through CGI',
      years: 'October 2025 to April 2026',
      team: 'Six Topstep engineers. I worked across the org with designers, product, and platform teams',
      tags: ['Product leadership', 'Program delivery', 'Data platform', 'Migration'],
    },
    // Every line is cut from the sections below.
    brief: [
      { label: 'The problem', text: 'Trade data was getting lost or delayed between systems. Account status, payouts, dashboards and notifications all depend on it, and the team was backfilling missing trades by hand every day.' },
      { label: 'My role', text: 'Product leader on an engineering team of 6. Strategy, alignment, prioritization, and delivery.' },
      { label: 'The first big call', text: 'Migrate trade sync first, the hardest and most business-critical workflow, with old and new running side by side and feature flags to roll back.' },
      { label: 'What changed', text: 'Trade sync moved to production and dropped trades went to zero. The next phase is a proposed direction from discovery.' },
    ],
    summary:
      "Topstep's trade data was getting lost between systems. I was the product leader on an engineering team of 6. I worked across the org with designers, product, and platform teams to understand the issue. Then I ran it as a product program, built around what traders need to trust.",
    sections: [
      {
        heading: 'The problem',
        blocks: [
          { type: 'p', text: 'Trade data was getting lost or delayed as it moved between systems. Traders count on that data for almost everything they see:' },
          { type: 'list', items: ['Account status and progression', 'Payout eligibility and calculations', 'Dashboards and notifications'] },
          { type: 'p', text: "When the data is off, a trader's account can look wrong. Their payout can be wrong too. The team was also checking for missing trades and backfilling them by hand every day. We had to make it reliable on a live product where real money was on the line." },
          { type: 'diagram', name: 'trade-break', caption: 'The break sat between the trade and everything a trader checks after it.' },
        ],
      },
      {
        heading: 'How I framed it',
        blocks: [
          { type: 'p', text: 'I started with the trader. I framed the work around the experiences at risk, so every technical decision pointed back to something a trader would feel.' },
          {
            type: 'list',
            items: [
              'Payout accuracy and account trust became the outcomes we worked toward.',
              'I tied product priorities to engineering dependencies and operational risk.',
              'Stakeholders got one shared way to talk about what mattered most.',
            ],
          },
          { type: 'diagram', name: 'impact-map', caption: 'One issue in the data showed up in three places for the trader before it reached the business.' },
        ],
      },
      {
        heading: 'The first big call',
        blocks: [
          { type: 'p', text: 'We migrated trade sync first. It was the highest-volume, most business-critical workflow.' },
          {
            type: 'points',
            items: [
              { title: 'Why:', text: 'Trade data loss was ongoing. Waiting cost traders and the business.' },
              { title: 'Trade-off:', text: 'Taking on the hardest workflow first put more pressure on delivery.' },
              { title: 'Safety net:', text: 'We ran old and new side by side, monitored both, and used feature flags so we could validate and roll back.' },
            ],
          },
          { type: 'diagram', name: 'migration-phases', caption: 'We built the foundation first so the hardest workflow could go next.' },
        ],
      },
      {
        heading: 'Getting everyone on the same page',
        blocks: [
          { type: 'p', text: 'I helped product, engineering, operations, and leadership agree on the work and its risks.' },
          // TODO(Erica): the doc wants your cross-pod framework drawn here. Send it and it goes in.
          {
            type: 'list',
            items: [
              'I organized priorities, dependencies, and rollout decisions around outcomes.',
              'I protected the critical path from competing requests. That meant saying no to some loud voices in the room.',
              'I built a cross-pod framework to keep teams in sync. I reused it later on another engagement.',
            ],
          },
        ],
      },
      {
        heading: 'Looking at the whole system',
        blocks: [
          { type: 'p', text: 'After the first migration, we stepped back and asked how trade data should move between systems.' },
          {
            type: 'list',
            items: [
              'We separated raw data replication from meaningful business events.',
              'We set a direction for clearer data ownership and less duplication.',
              'We put payout eligibility first, then dashboards and notifications.',
            ],
          },
          { type: 'p', text: 'This was discovery and planning for the next phase. It is a proposed direction and I show it that way.' },
          { type: 'diagram', name: 'data-ownership', caption: 'The proposed side is a direction from discovery.' },
        ],
      },
      {
        heading: 'What changed',
        blocks: [
          {
            type: 'list',
            items: [
              'The critical trade sync workflow moved to production, and dropped trades went to zero.',
              'Monitoring gave the team better visibility into how data moves.',
              'The team has a foundation for recovery and more modernization.',
            ],
          },
          { type: 'heading', text: 'What I took from it' },
          { type: 'p', text: 'Trust gets designed across the whole system. The interface is one piece. Who owns the data, how failures recover, and how teams make decisions all shape what the trader experiences.' },
        ],
      },
    ],
    // TODO(Erica): cut from the text above. Reword as you like.
    highlights: [
      'Led an engineering team of 6 through a migration on a live trading product.',
      'Took the hardest workflow first, with old and new running side by side.',
      'Trade sync moved to production and dropped trades went to zero.',
    ],
  },
  // The aerospace program. Source: the aerospace program draft in CaseStudy/, which is Erica's
  // working draft of 2026-11-19, word for word.
  //
  // NOT CLEARED FOR PUBLIC USE. Her draft says so, and Canon says the work is
  // under CMMC and client confidentiality. This repo is public, so do not push
  // this entry until she says it is cleared.
  //
  // The client is not named. Erica, 2026-11-19, after publishing: anonymize
  // this one and keep everything else. So no copy on the site names the
  // client, and the page address is /case-study/aerospace-program. Her employer
  // is not named. Naming the client is not the same as clearing the content.
  // Left off, as the markdown lists: every line her
  // draft marks "(confirm)", the "direction changed" section, the numbers from
  // her notes, and nine of the eleven visuals, which need her material.
  // TODO(Erica): exact title, start date (her draft says
  // July 2026, Canon says 2025), and everything on her "Before publishing" list.
  {
    slug: 'aerospace-program',
    // Unused since 2026-11-21: Erica didn't like the result strip. "In short"
    // (`highlights`) is the summary at the top now.
    results: [
      { value: 'Visible', label: 'all of the work in one place, mapped to the vision' },
      { value: 'Pods', label: 'named leaders with their own commitments' },
      { value: 'A fallback', label: 'and a date to decide' },
    ],
    // The mark that pops in on this study's Past Work card on hover (Erica, 2026-11-20).
    // No client logo: the client is not named. A plane icon stands in.
    // Erica, 2026-11-20: tie this study back to CGI. The CGI logo is its
    // second mark on Past Work, and its page opens with a link to the CGI study.
    // Erica, 2026-11-21: "switch CGI and icon placement, same for topstep". CGI
    // is the main mark in the top right corner now and the client's mark hangs
    // off the bottom left.
    workLogo: [
      { src: '/images/case-studies/brands/cgi.png', name: 'CGI', h: 'h-6' },
      { icon: 'plane', name: 'Aerospace', spot: 'bottomLeft' },
    ],
    // The CGI study, and the other client study beside it (Erica, 2026-11-20:
    // "should have the topstep one too").
    related: { label: 'More from my work at CGI', slugs: ['cgi-leadership', 'topstep'] },
    homeSection: 'leadership',
    title: 'Taking over an enterprise AI platform program mid-flight',
    tagline: "I made the work visible, cut what didn't serve the vision, reorganized the team into pods, and gave stakeholders a plan with a fallback.",
    linkLabel: 'Read the aerospace program case study',
    meta: {
      role: 'Program lead and product consultant. My focus was visibility, prioritization, team structure, and stakeholder expectations.',
      company: 'A global aerospace manufacturer, through CGI',
      // Erica, 2026-11-19, asked July 2026 or 2025: that it is ongoing. So no start
      // date is shown. TODO(Erica): the start date, when you want one here.
      years: 'Ongoing',
      // Erica, 2026-11-24: "i was working with 2 product folks and many engineers and tech leads".
      team: 'Two product people and many engineers and tech leads, on one platform team spread across government and commercial environments. Plus a strategy group and an internal customer team',
      tags: ['Program leadership', 'Team structure', 'Prioritization', 'AI platform'],
    },
    // Every line is cut from the sections below.
    brief: [
      { label: 'The situation', text: 'I joined as the previous program lead was rolling off. Several workstreams ran at once, there was no intake process, and the roadmap had never been signed off.' },
      { label: 'My role', text: 'Program lead and product consultant. Within weeks I was running day-to-day delivery for the team behind an internal AI assistant platform.' },
      { label: 'The setting', text: 'Government cloud, export-controlled data, and strict rules on tooling.' },
      { label: 'What I did', text: 'Made the work visible, stopped what did not map to the vision, rebuilt the roadmap, reorganized the team into pods, and paired the plan with a fallback and a date to decide.' },
      { label: 'Where it stands', text: 'The engagement is ongoing, so delivery outcomes are not claimed yet.' },
    ],
    summary:
      "I joined as the previous program lead was rolling off. Within weeks I was running day-to-day delivery for the team behind an internal AI assistant platform. I made the work visible, cut what didn't serve the vision, reorganized the team into pods, and gave stakeholders a plan with a fallback.",
    sections: [
      {
        heading: 'The situation',
        blocks: [
          { type: 'p', text: 'The previous lead had done good work, but most of the context lived in her head. The handoff was fast and heavy. Here is what I picked up:' },
          {
            type: 'points',
            items: [
              { title: 'Several workstreams at once.', text: 'The platform strategy group, the government team, the commercial team, and the first internal customer integration.' },
              { title: 'No intake process.', text: 'Requests came in from every direction. The loudest voice in the room set the priority.' },
              { title: 'Unwritten commitments.', text: 'Other teams were holding us to promises that had been made out loud and never recorded.' },
              { title: 'A roadmap nobody had signed off on.', text: 'Its estimates were set without planning sessions.' },
              { title: 'A stretched sponsor.', text: 'The client lead was pulled in many directions and hard to reach.' },
            ],
          },
          { type: 'p', text: 'The challenge was to get a clear picture and a workable plan without stopping delivery.' },
          { type: 'diagram', name: 'request-map', caption: 'Before: every request went straight to the team.' },
        ],
      },
      {
        heading: '1. Made the work visible first',
        blocks: [
          { type: 'p', text: "I couldn't prioritize what I couldn't see, so I started there." },
          // TODO(Erica): your draft calls the task-to-vision table the strongest artifact. A scrubbed copy goes here.
          {
            type: 'list',
            items: [
              "Interviewed every person on the team. I asked what they work on, where the work comes from, and who it's for.",
              'Built one table that mapped every task to the product vision.',
              'Listed every active initiative in one place and took the full list to the sponsor to show the load.',
              'Set up one shared board as the source of truth, in a tool the client had already approved.',
              'Kept a visible list of everything waiting on the sponsor, so approvals stopped stalling.',
            ],
          },
        ],
      },
      {
        heading: '2. Cut, then rebuilt the plan',
        blocks: [
          {
            type: 'list',
            items: [
              "Work that didn't map to the vision was stopped.",
              'I declined to reuse the inherited roadmap. The team rebuilt it through a short, tightly scoped strategy sprint.',
              'That sprint produced a capability map of the two existing products, a reference architecture, and a now / next / later roadmap.',
              'With the technical lead, we reframed the cloud migration as a platform effort. The goal became one platform that other teams build on.',
              'For unwritten commitments, I asked where and when each one was agreed. If nobody could show it, we renegotiated.',
              'Started an intake process so new requests get triaged before they reach the team.',
            ],
          },
        ],
      },
      {
        heading: '3. Restructured the team around the work',
        blocks: [
          // TODO(Erica): the cross-pod framework drawing goes here, in the same style as on the Topstep study.
          {
            type: 'list',
            items: [
              'Merged the government and commercial teams into one group and cancelled the duplicate meetings.',
              "Opened recurring meetings by asking whether they were still useful. The ones that weren't moved to async updates.",
              'Reorganized the team into smaller pods, using the cross-pod framework I first built on a previous engagement.',
              "Chose pod leaders for their questioning and product mindset, and I've been coaching them since.",
            ],
          },
          { type: 'p', text: 'The sponsor stepped back from managing the team. The team now makes day-to-day decisions and escalates only the big ones.' },
        ],
      },
      {
        heading: '4. Set expectations and kept resetting them',
        blocks: [
          // Left off until confirmed: stepping in to lead the platform roadmap presentation for senior leadership.
          {
            type: 'list',
            items: [
              'Ran a roadmap session where every pod made commitments.',
              'Paired the main delivery plan with a smaller fallback and a dated checkpoint to choose between them.',
              'When a customer team grew frustrated about turnaround, I made the active work visible to their manager and our sponsor. I treated the relationship as one to win.',
              'Told stakeholders plainly that we would keep re-checking timelines as we learned more.',
            ],
          },
          { type: 'diagram', name: 'decision-card', caption: 'How the roadmap handled risk.' },
          { type: 'heading', text: 'A hard moment' },
          { type: 'p', text: 'A senior engineer disagreed with a timeline commitment and felt left out of the decision. I owned my part in rushing it. I asked him to document the risks, took the relevant ones to the business, and changed how I bring him into decisions. The team kept moving while we worked through it.' },
        ],
      },
      {
        heading: 'What changed',
        blocks: [
          {
            type: 'list',
            items: [
              'The team can see all of its work in one place, mapped to the vision.',
              'Off-vision work stopped.',
              'Pods have named leaders and their own commitments.',
              'The team runs day to day, and the sponsor handles the big decisions.',
              'The roadmap has a fallback and a date to decide.',
            ],
          },
          { type: 'p', text: 'The engagement is ongoing, so delivery outcomes are not claimed yet.' },
          { type: 'heading', text: "What I'd tell another program lead" },
          { type: 'p', text: 'I start by making the work visible. Once everyone can see the same picture, the hard conversations about priorities get easier.' },
        ],
      },
    ],
    // From the three outcome cards her draft asks for: Visibility, Structure, A plan with a fallback.
    highlights: [
      'Visibility: all of the work in one place, mapped to the vision.',
      'Structure: pods with named leaders and their own commitments.',
      'A plan with a fallback, and a date to decide.',
    ],
  },
  // Leadership at CGI. Source: CaseStudy/cgi-consulting.md, first draft
  // 2026-11-19. Erica asked for one study that combines the aerospace client, Topstep, the
  // company-wide training and the upskilling in her practice.
  //
  // NOT CLEARED FOR PUBLIC USE: it leans on the aerospace client study and on
  // internal training material. This repo is public, so do not push it yet.
  //
  // The client parts are lines from her two studies. The training part is from
  // AI meeting summaries in her Notion, so each line there is hers to check.
  // TODO(Erica), all in the markdown: the format and reach of the practice
  // training (she gave the four topics), the 43, how many sessions, the title
  // and tagline (both mine).
  // Erica, 2026-11-24: the two company workshops were written and taught by
  // Ryan Wilson and her together, not by her alone. The page credits him
  // wherever it mentions them. The practice training in section 3 is hers.
  {
    slug: 'cgi-leadership',
    // Unused since 2026-11-21: Erica didn't like the result strip. "In short"
    // (`highlights`) is the summary at the top now.
    results: [
      { value: '2', label: 'workshops written and taught with Ryan Wilson' },
      { value: '43', label: 'people completed both by July 2026' },
      { value: '4', label: 'direct reports' },
    ],
    // The mark that pops in on this study's Past Work card on hover (Erica, 2026-11-20).
    // The CGI logo is from Wikimedia Commons (CGI_logo.svg, as a PNG).
    workLogo: { src: '/images/case-studies/brands/cgi.png', name: 'CGI', h: 'h-6' },
    homeSection: 'leadership',
    title: 'Leading product work at CGI',
    tagline: 'Two client programs, two workshops for the whole company, and the people I coach.',
    meta: {
      role: 'Principal Product Consultant. I lead client programs, teach inside the company, and coach product people.',
      company: 'CGI, which bought Callibrity. Clients: a global aerospace manufacturer and Topstep',
      years: 'June 2025 to present',
      team: 'Four direct reports. On client work, six Topstep engineers, then two product people and many engineers and tech leads at an aerospace client',
      tags: ['Leadership', 'Consulting', 'Training', 'Program delivery'],
    },
    related: { label: 'The two client case studies', slugs: ['aerospace-program', 'topstep'] },
    // Erica, 2026-11-24: "Ryan wilsoned linked". His name is a link to his
    // portfolio wherever it appears on this page (components/caseStudy/Mentions.js).
    mentions: [{ text: 'Ryan Wilson', href: 'https://ryangwilson.com/', preview: PREVIEWS.ryan }],
    brief: [
      { label: 'My role', text: 'Principal Product Consultant, with four direct reports.' },
      { label: 'Client programs', text: 'At Topstep I led an engineering team of 6 through a migration, and dropped trades went to zero. At a global aerospace manufacturer I took over a platform program and still run it.' },
      { label: 'Company training', text: 'Ryan Wilson, my director, and I wrote and taught two workshops, Discovery and Land and Expand. By July 2026, 43 people had completed both.' },
      { label: 'Who I worked with', text: 'Ryan Wilson, my director. We wrote and taught the workshops together, and I worked closely with him to drive his vision and enable the team.' },
      { label: 'What ties it together', text: 'The hard part of this work is usually communication, clarity, and expectations. So that is what I spend my time on.' },
    ],
    summary:
      "I'm a Principal Product Consultant at CGI, with four direct reports. In this role I lead in three places. On client work, I ran programs at Topstep and a global aerospace manufacturer. Inside the company, my director Ryan Wilson and I wrote and taught two workshops that every salaried employee is asked to take. And I coach the product people around me.",
    sections: [
      {
        heading: '1. Leading client programs',
        blocks: [
          { type: 'heading', text: 'A global aerospace manufacturer' },
          { type: 'p', text: 'I joined as the previous program lead was rolling off. Within weeks I was running day-to-day delivery for the team behind an internal AI assistant platform. I worked with two product people and many engineers and tech leads.' },
          {
            type: 'list',
            items: [
              'I interviewed every person on the team and mapped every task to the product vision.',
              "Work that didn't map to the vision was stopped, and the team rebuilt the roadmap.",
              "I reorganized the team into pods, chose pod leaders, and I've been coaching them since.",
              'I paired the delivery plan with a smaller fallback and a date to choose between them.',
            ],
          },
          { type: 'p', text: 'The engagement is ongoing, so delivery outcomes are not claimed yet.' },
          { type: 'heading', text: 'Topstep' },
          { type: 'p', text: "Topstep's trade data was getting lost between systems. I was the product leader on an engineering team of 6." },
          {
            type: 'list',
            items: [
              'I framed the work around what a trader would feel: account status, payouts, dashboards.',
              'We migrated trade sync first, the hardest workflow, with old and new running side by side.',
              'I protected the critical path from competing requests.',
              'Trade sync moved to production, and dropped trades went to zero.',
            ],
          },
          { type: 'heading', text: 'One framework, two clients' },
          // TODO(Erica): the cross-pod framework drawing goes here once you send it.
          { type: 'p', text: 'At Topstep I built a cross-pod framework to keep teams in sync. At the aerospace client I used it again to reorganize the team into pods.' },
        ],
      },
      {
        heading: '2. Training the whole company',
        blocks: [
          { type: 'p', text: 'Ryan Wilson, my director, and I wrote and taught two workshops, Discovery and Land and Expand. Both are for everyone, engineers included.' },
          { type: 'p', text: 'The Discovery workshop came out of resistance I saw when I asked people to do things outside their role. People heard "discovery" and thought meetings and delay.' },
          { type: 'heading', text: 'Discovery' },
          {
            type: 'points',
            items: [
              { title: 'It is ongoing.', text: 'Discovery clarifies the work. It does not delay it.' },
              { title: 'Everyone takes part.', text: 'Engineers may write PRDs. A non-technical view can surface a technical opportunity.' },
              { title: 'Problems, not symptoms.', text: 'Check that a task addresses a real problem before doing it.' },
              { title: 'Open questions.', text: '"How was the make-a-payment experience?" and not "Did you like it?"' },
              { title: 'Practice silence.', text: "Pause three to six seconds after a question and don't fill the space." },
              { title: "Undocumented discovery didn't happen.", text: 'AI writes the first draft now, so the job is checking it.' },
            ],
          },
          { type: 'p', text: 'Attendees add the kinds of deliverables they use to a shared database, so the list grows with each session.' },
          { type: 'heading', text: 'Land and Expand' },
          {
            type: 'points',
            items: [
              { title: 'It is not pitching.', text: 'It is understanding the client well and finding ways to help more. Expansion is a byproduct of good consulting.' },
              { title: 'Contractor or consultant.', text: 'A contractor waits for defined work. A consultant sees decisions and problems coming. The group votes on statements, with edge cases on purpose.' },
              { title: 'Bring options.', text: '"I don\'t know what to work on next, let me ask my PO" becomes bringing options and a recommendation.' },
              { title: 'Trust is built in small moments.', text: "Attendees say how they earned a client's trust without naming their title." },
              { title: 'It is a long game.', text: "It doesn't happen in big dramatic instances." },
            ],
          },
          { type: 'heading', text: 'How we ran it' },
          {
            type: 'list',
            items: [
              'Small sessions, with each workshop taught many times.',
              'A tracker of who has completed what, so we could see who still needed a session.',
              'By July 2026, 43 people had completed both.',
            ],
          },
        ],
      },
      {
        heading: '3. Growing product people',
        blocks: [
          // The four topics are Erica's words, 2026-11-19: "how to use AI in product,
          // how to act like a consultant and not contractor, how to go above and
          // beyond, accessibility training".
          // She ran it as group sessions, separate from the Land and Expand
          // workshop (her answers, same day).
          // TODO(Erica): who it was for, how many people, how often, and what changed.
          { type: 'p', text: 'I train the product people in my practice in group sessions. These are separate from the two company workshops. There are four topics:' },
          {
            type: 'list',
            items: [
              'How to use AI in product work',
              'How to act like a consultant and not a contractor',
              'How to go above and beyond',
              'Accessibility',
            ],
          },
          { type: 'p', text: "I have four direct reports at CGI. At the aerospace client I chose pod leaders for their questioning and product mindset, and I've been coaching them since." },
          { type: 'p', text: 'Both workshops make the same point about growth: these skills matter more as a consultant becomes more senior.' },
        ],
      },
      // Erica, 2026-11-19: "i should mention Ryan Wilson as my director i worked
      // closely with him to drive his vision and enable the team. Link his
      // portfolio https://ryangwilson.com/ he was a partner in the CGI leadership".
      {
        heading: 'Who I worked with',
        blocks: [
          {
            type: 'p',
            // His name is the link to his portfolio (`mentions` above), so there is
            // no separate "Ryan's portfolio" link after this paragraph. Erica,
            // 2026-11-25, after seeing both in one paragraph: "revert that".
            text: 'Ryan Wilson was my director and my partner in this work. We wrote the Discovery and Land and Expand workshops together, and we both taught them. I worked closely with him to drive his vision and enable the team.',
          },
        ],
      },
      {
        heading: 'What I took from it',
        blocks: [
          { type: 'p', text: 'The biggest problems I see across industries are communication, clarity, and expectations. Technology comes after that. It is true on a client program and it is what I teach.' },
        ],
      },
    ],
    // TODO(Erica): cut from the text above. Reword as you like.
    highlights: [
      'Led programs at two clients, and reused my own framework at the second.',
      'Wrote and taught two workshops for the whole company with my director, Ryan Wilson.',
      'Trained the product practice on AI, consulting and accessibility, with four direct reports.',
    ],
  },
];

// `homeSection` on a study is the id of the home page section its card is in
// (`leadership` or `case-studies`). The Home link at the top of the study
// goes back there. A study with none, like Helix Booking, goes to the top.
export const getCaseStudy = (slug) => caseStudies.find((s) => s.slug === slug);

export const nextCaseStudy = (slug) => {
  const i = caseStudies.findIndex((s) => s.slug === slug);
  if (i === -1) return null;
  return caseStudies[(i + 1) % caseStudies.length];
};
