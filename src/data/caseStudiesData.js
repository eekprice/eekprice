import {
  ProblemCard,
  PhotoCard,
  SolutionCard,
  BenefitsCard,
  MetricCard,
  ActivitiesCard,
  ResearchCard,
  ArtCard,
  SlideCard,
} from '../components/caseStudy/Overview';
import { getCaseStudy } from './caseStudies';
import { ReactComponent as KfcWires } from '../assets/StudyPOS/wiresKfc.svg';

const posStudy = getCaseStudy('yum-pos');
const pos = posStudy.overview;
const menuSlides = getCaseStudy('menu-management').slides;

// Slide widths. WIDE is two STANDARD slides plus the 16px gap between them.
const STANDARD = 'w-[264px]';
const WIDE = 'w-[544px]';

// `published: false` keeps a study out of the page without deleting it.
// `placeholder: true` on a slide hides that slide the same way.
// `href` is the link to the full study. Leave it off until the page exists;
// the card only shows "Read full study" when href is set.
// `stickers` are emoji or brand logos (`image` and `name`) scattered around the card. `className` is the spot
// (Tailwind position classes, relative to the card), `rotate` is the tilt.

const cardClass = `flex flex-col justify-between h-full p-4
  bg-surface-background200-light dark:bg-surface-background200-dark
  text-surface-foreground100-light dark:text-surface-foreground100-dark
  border-2 border-surface-outline-light dark:border-surface-outline-dark
  rounded-lg`;

const studies = [
  {
    title: "Speeding up the drive thru",
    stickers: [
      { image: '/images/case-studies/brands/kfc.webp', name: 'KFC', className: 'w-16 lg:w-20 right-4 top-1 lg:right-[38%] lg:top-3', rotate: -8 },
      // KFC sits between the title and the link. At 24% from the right it covered
      // the link once the label got longer ("Read the drive thru case study").
      { image: '/images/case-studies/brands/taco-bell.webp', name: 'Taco Bell', className: 'w-9 lg:w-11 left-[9%] -bottom-3 lg:left-auto lg:bottom-auto lg:-right-8 lg:top-12', rotate: 8 },
    ],
    // On desktop, hovering the card slides this green sticky out from behind
    // its left edge, up by the title. It links to the study. It also comes
    // out when the card is the one most in view. Same picture as the study's note in the nav fan.
    peek: { title: 'Speeding up the drive thru', image: posStudy.note.image },
    order: 2,
    published: true,
    href: '/case-study/yum-pos',
    // Eight slides, numbered in story order. Two widths only so the strip
    // reads as one set: STANDARD, and WIDE (two standards plus the gap).
    // Same components and content as the top of the case study page.
    slideHeight: 'h-[332px]',
    slides: [
      { content: <ProblemCard problem={pos.problem} step={1} />, width: STANDARD },
      { content: <PhotoCard photo={pos.photo} step={2} />, width: STANDARD },
      { content: <ResearchCard research={pos.research} step={3} />, width: WIDE },
      {
        content: (
          <ArtCard title="Wireframes" step={4}>
            <KfcWires className="absolute inset-0 w-full h-full" role="img" aria-label="Wireframes for the KFC order flow" />
          </ArtCard>
        ),
        width: WIDE,
      },
      { content: <SolutionCard solution={pos.solution} step={5} />, width: WIDE },
      { content: <BenefitsCard benefits={pos.benefits} step={6} />, width: STANDARD },
      { content: <MetricCard metric={pos.metric} step={7} />, width: STANDARD },
      { content: <ActivitiesCard activities={pos.activities} step={8} />, width: STANDARD },
    ],
  },
  {
    title: "Simplifying schemas in menus",
    stickers: [
      // Erica, 2026-11-18: the Pizza Hut, Yum and KFC logos float in like the
      // drive thru card's. They took the place of the pizza and thumbs up emoji.
      { image: '/images/case-studies/brands/kfc.webp', name: 'KFC', className: 'w-16 lg:w-20 left-[9%] -bottom-3 lg:left-auto lg:bottom-auto lg:-right-10 lg:top-14', rotate: 8 },
      // Erica, 2026-11-18: "switch up the KFC placement". KFC and Pizza Hut traded
      // places, so this card is not laid out like the drive thru one: Pizza Hut is
      // between the title and the link, KFC hangs off the right edge.
      // On a phone Pizza Hut sits by the link, because this title runs the full width.
      // TODO(Erica): this Yum logo was cut out of your mock. Send the real file.
      { image: '/images/case-studies/brands/yum.webp', name: 'Yum', className: 'w-9 lg:w-11 right-[34%] -bottom-3 lg:right-[24%] lg:bottom-auto lg:-top-5', rotate: 6 },
      { image: '/images/case-studies/brands/pizza-hut.webp', name: 'Pizza Hut', className: 'w-10 lg:w-12 right-4 top-12 lg:right-[40%] lg:top-1', rotate: -8 },
    ],
    // Erica, 2026-11-18: the same sticky as the drive thru card. Blue, like this
    // study's note in the nav fan, with the final screen on it.
    // The sticky's words are shorter than the study's title so they fit above the picture.
    peek: { title: 'Simplifying menus', color: 'blue', image: '/images/case-studies/menu-management-final-ui-screen.webp' },
    order: 1,
    published: true,
    href: '/case-study/menu-management',
    // Seven slides that tell the engineering story, not the drive thru beats.
    // The list lives in data/caseStudies (`slides`) and is shared with the
    // grid at the top of the case study page.
    slideHeight: 'h-[332px]',
    slides: menuSlides.map((slide, i) => ({
      content: <SlideCard slide={slide} step={i + 1} />,
      width: slide.wide ? WIDE : STANDARD,
    })),
  },
  {
    title: "poop",
    published: false, // TODO(Erica): real title and slides. The copy below doesn't follow Canon/voice.md.
    slides: [
      {
        content: (
          <div className={cardClass}>
            <h3 className="text-xl font-bold mb-4">Design Philosophy</h3>
            <div className="space-y-4">
              <p className="text-sm">
                As a Product Design Manager, I believe in creating intuitive, user-centered experiences that solve real problems.
                My approach combines research, iteration, and collaboration to deliver impactful solutions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-surface-background100-light dark:bg-surface-background100-dark rounded-lg">
                  <h4 className="font-bold mb-2">Research First</h4>
                  <p className="text-xs">Understanding users through thorough research and data analysis</p>
                </div>
                <div className="p-3 bg-surface-background100-light dark:bg-surface-background100-dark rounded-lg">
                  <h4 className="font-bold mb-2">Iterate & Improve</h4>
                  <p className="text-xs">Continuous improvement through feedback and iteration</p>
                </div>
              </div>
            </div>
          </div>
        ),
        width: 'w-[400px]'
      }
    ],
  },
];

// Home page order follows the Figma: menu schemas first, then the drive thru.
export const caseStudies = [...studies].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
