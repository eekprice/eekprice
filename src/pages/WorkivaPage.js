import React from 'react';
import Home from './Home';
import { HeroCopy } from '../data/heroCopy';
import { workivaCopy } from '../data/workiva';

// /workiva: the home page with its own hero text, for one reader. Nothing on
// the site links here. It is a page to send someone. The words are in
// data/workiva.js; everything else is Home, so the two never drift apart.
function WorkivaPage() {
  return (
    <HeroCopy.Provider value={workivaCopy}>
      <Home />
    </HeroCopy.Provider>
  );
}

export default WorkivaPage;
