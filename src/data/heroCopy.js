import { createContext, useContext } from 'react';
import { hero } from './home';

// The words in the hero. Home uses the defaults from data/home.js. A copy of
// Home for one reader (pages/WorkivaPage.js) wraps it in HeroCopy.Provider and
// passes its own: { greeting, title, subline, about }. `about` is the text in
// the about box; leave it out to keep the usual paragraph.
export const HeroCopy = createContext(hero);
export const useHeroCopy = () => ({ ...hero, ...useContext(HeroCopy) });
