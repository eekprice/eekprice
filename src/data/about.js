// About page copy. Layout follows the Figma frame "iPad mini 8.3 - 2"
// (Tailwind Portfolio). Words are Erica's with typos fixed.

export const intro = {
  kicker: 'Hobbies...',
  heading: "I'm a bit chaotic...",
  // The part of the heading that gets circled in red marker. Remove this line
  // for a plain heading.
  circled: 'chaotic...',
  text:
    'My ADHD fuels my passion for exploring the many facets of life, from teaching and designing to latte art and making up silly games with my 5-year-old son.',
};

// `emoji` stands in for the blue hand-drawn icons in the Figma (mug, game
// console, flower, cube, music note). TODO(Erica): export those doodles as SVG
// and swap them in.
// `photos` is the 2x2 grid beside each hobby. Empty slots render as the purple
// tiles from the Figma. TODO(Erica): add up to four image paths per hobby.
export const hobbies = [
  {
    emoji: '☕',
    title: 'MMMM Coffee',
    text:
      "Coffee triggers my mad scientist energy and is for sure my love language. Visit me and you will get experimented on while I find out your perfect cup. Beware, it's espresso, so it's potent.",
    photos: [],
  },
  {
    emoji: '🎮',
    title: 'Nerd Alert',
    text:
      'I got this little game thing for my kiddo but really got it for me, to learn JavaScript and code silly games for him.',
    // TODO(Erica): MakeCode profile URL. The Figma has "Maker code profile," with no link yet.
    photos: [],
  },
  {
    emoji: '🌿',
    title: 'Is that mint?',
    text:
      "Don't mind me. Just accidentally created a jungle in my back yard. I sometimes manically plan out my garden and track when I check in on things and when to harvest. Did I create a Jira board for my garden? Yes, but in Notion.",
    photos: [],
  },
  {
    emoji: '🧊',
    title: 'CAD Modeling',
    text:
      'I love creating little inventions and pushing my personal boundaries in fields I have no business being in. Modeling in CAD has given me a new perspective and makes me feel more connected to my family, who come from the machining and manufacturing industry.',
    photos: [],
  },
  {
    emoji: '🎵',
    title: 'ummm...',
    text:
      'I have been in love not just with music but with creating music. I grew up with a baby grand and a whole band room, so music was always the thing I played with growing up. The dyslexia made it almost impossible to read sheet music or guitar tabs, but with recent tech I am determined to up my skill and finally learn how to read music instead of painfully listening and guessing until I get it right. YouTube was a game changer.',
    photos: [],
  },
];
