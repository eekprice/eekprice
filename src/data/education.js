// Copy for /education (pages/EducationPage.js). Erica, 2026-11-20: a new page
// called Education, in the site's style, with the words and pictures from the
// "Contributions" page of her Framer site (verbatim in
// Portfolio/CaseStudy/imports/framer-2023/teaching.md, plus the newer lines in
// the screenshot she sent). Reworded to Canon/voice.md.
//
// Past tense for Memorisely: Erica, 2026-11-20, "its past tense I dont actively
// teach anymore". (The Framer page says "I teach".)

import React from 'react';
import ExternalLink from '../components/ExternalLink';
import { PREVIEWS } from './links';

// Ryan Wilson, co-author on both papers. Same link and hover preview as on
// the CGI leadership study.
const RYAN_URL = 'https://ryangwilson.com/';
const ryanLink = 'text-surface-foreground100-light dark:text-surface-foreground100-dark hover:text-primary-foreground-light dark:hover:text-primary-foreground-dark';

const AHFE_PAPER =
  'https://openaccess.cms-conferences.org/publications/book/978-1-964867-19-9/article/978-1-964867-19-9_22';

export const education = {
  title: 'Education',
  // The line under the title, and the tags under it.
  tagline: 'Teaching, course making, and conference talks.',
  tags: ['Teaching', 'Curriculum', 'Public speaking', 'Accessibility'],
  intro:
    'I taught live UX/UI courses at Memorisely and made async video lessons for its platform. I have also spoken at conferences, on topics like accessibility and UX with AI.',
  items: [
    {
      id: 'bootcamp',
      where: 'Memorisely',
      title: 'Live Bootcamp Teacher',
      text: 'I taught live classes at Memorisely. UX research, UX/UI for beginners, advanced Figma for UI design, and more.',
      image: '/images/education/memorisely-bootcamp.webp',
      alt: 'A live class on a video call, with a sticky note warm-up board',
      links: [{ label: 'Memorisely Bootcamp', href: 'https://www.memorisely.com/' }],
    },
    {
      id: 'online',
      where: 'Memorisely',
      title: 'Educational Creator',
      text: 'I taught courses on native app design and accessibility on the Memorisely platform. I also wrote the curriculum and made the async lessons.',
      image: '/images/education/memorisely-online.png',
      alt: 'My video lessons on native app design in the Memorisely library',
      links: [{ label: 'Memorisely Online', href: 'https://www.memorisely.com/online-ux-ui-courses' }],
    },
    {
      id: 'speaker',
      where: 'AHFE International · Paris, 2024',
      title: 'Conference Speaker',
      // Erica, 2026-11-20: talk about co-authoring, on the talk and the papers,
      // and link Ryan's portfolio. Authors are from each paper's AHFE page:
      // 2024 is Ryan G Wilson and Erica Price. The 2025 page lists a third
      // author, who is left off here at Erica's ask (2026-11-20).
      text: (
        <>
          I co-authored two papers with{' '}
          <ExternalLink href={RYAN_URL} preview={PREVIEWS.ryan} className={ryanLink}>Ryan Wilson</ExternalLink>,
          published by AHFE in 2024 and 2025. In 2024 we spoke together at the AHFE International Conference in
          Paris, France, about the first one: advocating for accessibility in business. The second is Rethinking UX
          Education.
        </>
      ),
      image: '/images/education/ahfe-conference.webp',
      alt: 'The AHFE Open Access listing for our paper, and me presenting on a video call',
      links: [
        { prefix: 'Conference', label: 'AHFE International', href: 'https://ahfe.org/' },
        { prefix: 'Published on', label: 'AHFE Open Access', href: AHFE_PAPER },
      ],
      // Titles as they are on her page. One with no `href` is plain text.
      // `by` is the year and co-authors, shown under the title.
      papers: [
        // The 2025 paper. Erica sent the link on 2026-11-20.
        {
          label: 'Rethinking UX Education',
          by: '2025. With Ryan Wilson',
          href: 'https://openaccess.cms-conferences.org/publications/book/978-1-964867-58-8/article/978-1-964867-58-8_6',
        },
        {
          label: 'Accessibility design in user experience and digital product design: Ethical and practical imperatives',
          by: '2024. With Ryan Wilson',
          href: AHFE_PAPER,
        },
      ],
    },
  ],
};
