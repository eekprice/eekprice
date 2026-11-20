import React from 'react';
import Home from './Home';
import { HeroCopy } from '../data/heroCopy';
import { leadershipCopy } from '../data/leadership';

// /leadership: the home page with the leadership hero text, the link to post
// when applying for leadership roles. Home itself is the IC version. Nothing
// on the site links here. The words are in data/leadership.js; everything
// else is Home, so the two never drift apart.
function LeadershipPage() {
  return (
    <HeroCopy.Provider value={leadershipCopy}>
      <Home />
    </HeroCopy.Provider>
  );
}

export default LeadershipPage;
