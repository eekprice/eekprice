import { motion } from 'framer-motion';
import React from 'react';

const RocketBackground = () => {
  const eggplants = Array(5).fill('🍆');

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {eggplants.map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-5 dark:opacity-10"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 45
          }}
          animate={{ 
            y: -100,
            rotate: 45 + (Math.random() * 20 - 10)
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: "linear"
          }}
        >
          🍆
        </motion.div>
      ))}
    </div>
  );
};

export default RocketBackground; 