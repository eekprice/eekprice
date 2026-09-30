import {
  ProblemCard,
  PhotoCard,
  SolutionCard,
  BenefitsCard,
  MetricCard,
  ActivitiesCard,
  ResearchCard,
  ArtCard,
} from '../components/caseStudy/Overview';
import { getCaseStudy } from './caseStudies';
import { ReactComponent as KfcWires } from '../assets/StudyPOS/wiresKfc.svg';

const pos = getCaseStudy('yum-pos').overview;

// `published: false` keeps a study out of the page without deleting it.
// `placeholder: true` on a slide hides that slide the same way.
// `href` is the link to the full study. Leave it off until the page exists;
// the card only shows "Read full study" when href is set.
// `stickers` are emoji scattered around the card. `className` is the spot
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
      { emoji: '🍗', className: 'right-4 top-2 lg:right-[27%] lg:top-3', rotate: -16 },
      { emoji: '🌮', className: 'left-[9%] -bottom-3 lg:left-[44%] lg:-bottom-4', rotate: 12 },
    ],
    order: 2,
    published: true,
    href: '/case-study/yum-pos',
    // Six cards from the Figma slide row (Portfolio 2024, node 17:10775), plus
    // Erica's original Research and Wireframes slides in the same card style.
    // Same components and content as the top of the case study page.
    slideHeight: 'h-[332px]',
    slides: [
      { content: <ProblemCard problem={pos.problem} />, width: 'w-80' },
      { content: <PhotoCard photo={pos.photo} />, width: 'w-60' },
      { content: <ResearchCard research={pos.research} />, width: 'w-[700px]' },
      {
        content: (
          <ArtCard title="Wireframes">
            <KfcWires className="absolute inset-0 w-full h-full" role="img" aria-label="Wireframes for the KFC order flow" />
          </ArtCard>
        ),
        width: 'w-[440px]',
      },
      { content: <SolutionCard solution={pos.solution} />, width: 'w-[628px]' },
      { content: <BenefitsCard benefits={pos.benefits} />, width: 'w-[373px]' },
      { content: <MetricCard metric={pos.metric} />, width: 'w-[373px]' },
      { content: <ActivitiesCard activities={pos.activities} />, width: 'w-[373px]' },
    ],
  },
  {
    title: "Simplifying menu schemas",
    stickers: [
      { emoji: '🍕', className: 'left-[22%] bottom-3 lg:left-[31%] lg:bottom-5', rotate: 14 },
      { emoji: '👍', className: 'right-[9%] bottom-7 lg:right-[14%] lg:bottom-9', rotate: -9 },
    ],
    order: 1,
    published: true, // TODO(Erica): slides for this home card. The full page is ready.
    href: '/case-study/menu-management',
    slides: [
      { content: "Slide 1 Content", placeholder: true },
      { content: "Slide 2 Content", placeholder: true },
    ],
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
