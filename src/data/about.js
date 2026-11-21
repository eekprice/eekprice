// About page copy. Layout follows the Figma frame "iPad mini 8.3 - 2"
// (Tailwind Portfolio). Words are Erica's with typos fixed.

export const intro = {
  kicker: 'Hobbies...',
  heading: "I'm a bit chaotic...",
  // The part of the heading that gets circled in teal marker, after the
  // heading has typed itself in. Remove this line
  // for a plain heading.
  circled: 'chaotic...',
  text:
    'My ADHD fuels my passion for exploring the many facets of life, from teaching and designing to latte art and making up silly games with my 5-year-old son.',
};

// `emoji` stands in for the blue hand-drawn icons in the Figma (mug, game
// console, flower, cube, music note). TODO(Erica): export those doodles as SVG
// and swap them in.
// `photos` is the 2x2 grid beside each hobby. Empty slots render as the purple
// tiles from the Figma. A hobby can have more than four: the grid grows by rows.
// Erica's own photos, sent 2026-11-21. Originals are in Assets/hobbies/.
const photo = (name) => `/images/hobbies/${name}.webp`;

export const hobbies = [
  {
    emoji: '☕',
    title: 'MMMM Coffee',
    text:
      "Coffee triggers my mad scientist energy and is for sure my love language. Visit me and you will get experimented on while I find out your perfect cup. Beware, it's espresso, so it's potent.",
    photos: [photo('coffee-rosetta'), photo('coffee-heart'), photo('coffee-tulip')],
  },
  // Erica, 2026-11-21: "remove this section and make it about my illustration
  // work instead". It replaced Nerd Alert (the game console and JavaScript
  // one). She asked for a draft and gave no details, so this one leans on what
  // the site already shows: the storyboards in her case studies. She read the
  // draft and said "It's right". She sent seven illustrations the same day, so
  // "More of those here soon" came off the end.
  {
    emoji: '✏️',
    title: 'Doodle brain',
    text:
      'I think in pictures. At work that turns into storyboards and sketches. Off the clock it turns into illustrations.',
    photos: [
      photo('illustration-red-dress'),
      photo('illustration-dino'),
      photo('illustration-deer'),
      photo('illustration-agent-herding'),
      photo('illustration-raccoon'),
      photo('illustration-portrait'),
      photo('illustration-traveler'),
    ],
    // The prints under the text stack one above the other at the right end, so
    // the traveler sits below the portrait, beside the raccoon (her sketch).
    moreStacked: true,
    // Erica, 2026-11-21: she drew the raccoon moving under the stack beside the
    // text, then asked for it centered there. `beside` is how many prints sit
    // in that stack.
    beside: 5,
  },
  {
    emoji: '🌿',
    title: 'Is that mint?',
    text:
      "Don't mind me. Just accidentally created a jungle in my back yard. I sometimes manically plan out my garden and track when I check in on things and when to harvest. Did I create a Jira board for my garden? Yes, but in Notion.",
    photos: [
      photo('garden-raised-beds'),
      photo('garden-rhubarb-and-chard'),
      photo('garden-irises'),
      photo('garden-vines'),
      photo('garden-indoor-spinach'),
      photo('garden-pumpkin'),
    ],
    // Erica, 2026-11-21 ("move this too"): the spinach print sits centered
    // under the stack beside the text, like the raccoon above, and the pumpkin
    // slides in against it.
    beside: 5,
  },
  // Erica, 2026-11-21: "make this one about book writing". It replaced CAD
  // Modeling. The copy is a draft from her words the same day: two cheesy
  // romance novels (a spy one with a werewolf twist, a time travel one), she
  // loves sci-fi, she writes out of order, and she is working on a book
  // writing app that isn't linear. TODO(Erica): the title is mine.
  {
    emoji: '📖',
    title: 'Plot twist',
    text:
      "I'm writing two cheesy romance novels. One is a spy story with a werewolf twist. The other is time travel, because I love sci-fi. I don't write in order. I let the inspiration come whenever, write that scene, then look at how the story can come together. So I'm also working on a book writing app that isn't linear.",
    photos: [],
  },
  {
    emoji: '🎵',
    title: 'ummm...',
    text:
      'I have been in love not just with music but with creating music. I grew up with a baby grand and a whole band room, so music was always the thing I played with growing up. The dyslexia made it almost impossible to read sheet music or guitar tabs, but with recent tech I am determined to up my skill and finally learn how to read music instead of painfully listening and guessing until I get it right. YouTube was a game changer.',
    photos: [photo('music-piano'), photo('music-guitar')],
  },
];
