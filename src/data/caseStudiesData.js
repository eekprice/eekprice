import employeeImg from '../assets/StudyPOS/employee.png';
import ControlledGif from '../components/atoms/ControlledGif';
import { ReactComponent as ReactionOhNo } from '../assets/OhDear.svg';
import { ReactComponent as KfcWires } from '../assets/StudyPOS/wiresKfc.svg';

// `published: false` keeps a study out of the page without deleting it.
// `placeholder: true` on a slide hides that slide the same way.
// `href` is the link to the full study. Leave it off until the page exists;
// the card only shows "Read full study" when href is set.

const cardClass = `flex flex-col justify-between h-full p-4
  bg-surface-background200-light dark:bg-surface-background200-dark
  text-surface-foreground100-light dark:text-surface-foreground100-dark
  border-2 border-surface-outline-light dark:border-surface-outline-dark
  rounded-lg`;

const studies = [
  {
    title: "Speeding up the drive thru",
    order: 2,
    published: true,
    href: '/case-study/yum-pos',
    slides: [
      {
        content: (
          <div className={cardClass}>
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex flex-row justify-between items-end">
                <h3 className="text-xl font-bold">Problem</h3>
                <div className="w-16">
                  <img
                    src={employeeImg}
                    alt="KFC drive thru employee"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              <p className="text-sm text-left border-l-4 border-surface-outline-light dark:border-surface-outline-dark pl-4 italic">
                "My biggest complaint is how rigid my team members have to be in the drive thru. Ordering is a conversation and the POS isn't flexible to accommodate them "
              </p>
              <p className="text-sm text-left">Angela - KFC Manager</p>
            </div>
          </div>
        ),
        width: 'w-64'
      },
      {
        content: (
          <div className="relative w-full h-full">
            <div className="h-full w-full">
              <ControlledGif
                src="/images/pos-legacy.webp"
                poster="/images/pos-legacy-poster.webp"
                alt="Legacy POS in the drive thru"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-16 rounded-lg
             bg-surface-background200-light dark:bg-surface-background200-dark
             border-2 border-surface-outline-light dark:border-surface-outline-dark">
              <ReactionOhNo className="w-full h-auto text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current" />
            </div>
          </div>
        ),
        width: 'w-[400px]'
      },

      {
        content: (
          <div className="relative w-full h-full">
            <div className="h-full w-full">
              <KfcWires
                className="w-full h-full rounded-lg"
              />
            </div>

          </div>
        ),
        width: 'w-[400px]'
      },
      {
        content: (
          <div className="flex items-end justify-center h-full w-full">
            <img
              src="/images/kfc-pos-concept.webp"
              alt="KFC POS concept"
              loading="lazy"
              decoding="async"
              className="max-w-full h-auto object-contain"
            />
          </div>
        ),
        width: 'w-[400px]'
      },
      {
        content: (
          <div className={cardClass}>
            <h3 className="text-xl font-bold mb-4 lg:mb-6">Research</h3>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
              <div className="flex flex-col items-center">
                <span className="text-xl lg:text-2xl font-bold">35+</span>
                <span className="text-sm text-center">Studies conducted</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl lg:text-2xl font-bold">200+</span>
                <span className="text-sm text-center"># of Participants</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl lg:text-2xl font-bold">4</span>
                <span className="text-sm text-center">States Visited</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl lg:text-2xl font-bold">9</span>
                <span className="text-sm text-center">Stores Visits</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl lg:text-2xl font-bold">60+</span>
                <span className="text-sm text-center">Hours in Store</span>
              </div>
            </div>
          </div>
        ),
        width: 'w-[800px]'
      },
      { content: "Slide 2 Content", placeholder: true },
      { content: "Slide 2 Content", placeholder: true },
      { content: "Slide 2 Content", placeholder: true },
    ],
  },
  {
    title: "Simplifying menu schemas",
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
