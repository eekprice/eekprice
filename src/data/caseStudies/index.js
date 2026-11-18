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
    // What the link on the home card says, so it names the study it opens.
    linkLabel: 'Read the menu case study',
    tagline: "Yum's Menu Management tool, rebuilt around the people who publish menus instead of the API.",
    hero: { src: img('menu-management-final-ui-tree-grid'), alt: 'Menu Management with the tree grid and action panel' },
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
        image: { src: img('menu-management-final-ui-screen'), alt: 'Menu Management with the tree grid and the action panel', position: 'object-left-top', framed: true },
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
  // The leadership story. Source: CaseStudy/yum-ux-leadership.md, imported
  // 2026-11-16 from Erica's Claude doc. Every [Confirm] in the doc is a
  // TODO(Erica) in the markdown and its sentence is left out here. No hero
  // and no pictures yet: the doc's pictures need names and faces blurred, and
  // the Byte slides are internal. It sits last, so the nav fan (first three
  // studies) doesn't change.
  {
    slug: 'yum-ux-leadership',
    title: 'Leading UX at Yum Brands',
    tagline: 'How I set the direction for design, built the way the team worked, and took research into stores.',
    meta: {
      // TODO(Erica): exact starting title, and how long until the promotion.
      role: 'Joined as a senior designer, promoted to UX Manager and Principal Product Designer. I led the design strategy for Byte, the way the team worked, and the plan for field research across four brands.',
      company: 'Yum Brands (KFC, Taco Bell, Pizza Hut, Habit Burger)',
      years: 'March 2022 to September 2025',
      // Six direct reports is from Canon/about.md (Erica pointed to it, 2026-11-16).
      // The table below is the wider team (16 designers, 2 researchers). Six of them reported to her.
      team: 'Six direct reports, within a wider UX team of designers and researchers across six product areas. Partners in product, engineering, brand operations and an outside research partner',
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
      { label: 'My role', text: 'UX Manager and Principal Product Designer, with six direct reports. I owned the design direction for Byte, how the team worked, and the plan for field research.' },
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
            caption: 'The wider UX team, by product area. Six of these people reported to me.',
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
];

export const getCaseStudy = (slug) => caseStudies.find((s) => s.slug === slug);

export const nextCaseStudy = (slug) => {
  const i = caseStudies.findIndex((s) => s.slug === slug);
  if (i === -1) return null;
  return caseStudies[(i + 1) % caseStudies.length];
};
