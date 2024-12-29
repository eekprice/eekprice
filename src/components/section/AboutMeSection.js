import React from 'react';
import { motion } from 'framer-motion';

function AboutMeSection({ itemVariants }) {
  return (
    <motion.div className="flex flex-col space-y-4 w-full items-start px-4" variants={itemVariants}>
      <div className=" bg-white mt-8">
        <p className="text-lg font-merriweather">
          Hi, I’m <span className="bg-yellow-200">Erica</span>, a UX leader passionate about <span className="bg-yellow-200">creating connections</span>—between teams, tools, and the people we design for. I specialize in <span className="bg-yellow-200">building systems that empower teams</span> to thrive and deliver accessible, high-quality experiences.
        </p>
        <p className="text-lg font-merriweather mt-4">
          I’ve worked to <span className="bg-yellow-200">bridge gaps between UX and product and development, streamline workflows</span>, and build trust, all while helping teams tackle complex design challenges.
        </p>
        <p className="text-lg font-merriweather mt-4">
          At my core, I believe design isn’t just about products—it’s about creating environments where <span className="bg-yellow-200">people and ideas can flourish</span>.
        </p>
      </div>
    </motion.div>
  );
}

export default AboutMeSection;
