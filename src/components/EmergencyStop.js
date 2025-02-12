import { motion } from 'framer-motion';
import React, { useState } from 'react';

const EmergencyStop = () => {
  const [isEmergencyStopped, setIsEmergencyStopped] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleEmergencyStop = () => {
    setIsEmergencyStopped(true);
    // Add a div that covers the entire screen and prevents interaction
    const blocker = document.createElement('div');
    blocker.style.position = 'fixed';
    blocker.style.inset = '0';
    blocker.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    blocker.style.zIndex = '9999';
    blocker.style.cursor = 'not-allowed';
    blocker.style.display = 'flex';
    blocker.style.flexDirection = 'column';
    blocker.style.alignItems = 'center';
    blocker.style.justifyContent = 'center';
    blocker.style.pointerEvents = 'auto';
    
    // Add click event listener to the blocker
    blocker.addEventListener('click', (e) => {
      setClickCount(prev => {
        const newCount = prev + 1;
        
        // Create and position the floating text
        const floatingText = document.createElement('div');
        floatingText.style.position = 'fixed';
        floatingText.style.left = `${e.clientX + 20}px`;
        floatingText.style.top = `${e.clientY - 10}px`;
        floatingText.style.color = 'white';
        floatingText.style.pointerEvents = 'none';
        floatingText.style.animation = 'float-away 1s forwards';
        floatingText.style.fontSize = '1.2rem';
        floatingText.style.fontWeight = 'bold';
        floatingText.style.zIndex = '10000';
        
        // Add the animation style if it doesn't exist
        if (!document.querySelector('#float-animation')) {
          const style = document.createElement('style');
          style.id = 'float-animation';
          style.textContent = `
            @keyframes float-away {
              0% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-20px); }
            }
          `;
          document.head.appendChild(style);
        }

        floatingText.textContent = 'lol';
        document.body.appendChild(floatingText);

        // Remove the floating text after animation
        setTimeout(() => {
          floatingText.remove();
        }, 1000);

        // Show refresh message after third click, but only if it doesn't exist yet
        if (newCount === 3 && !document.querySelector('#refresh-hint')) {
          const refreshHint = document.createElement('div');
          refreshHint.id = 'refresh-hint'; // Add an ID to check for existence
          refreshHint.style.color = 'white';
          refreshHint.style.fontSize = '1.2rem';
          refreshHint.style.marginTop = '1rem';
          refreshHint.textContent = 'Refresh the page and that will fix it';
          messageContainer.appendChild(refreshHint);
        }

        return newCount;
      });
    });
    
    // Create container for messages
    const messageContainer = document.createElement('div');
    messageContainer.style.display = 'flex';
    messageContainer.style.flexDirection = 'column';
    messageContainer.style.alignItems = 'center';
    messageContainer.style.gap = '1rem';
    blocker.appendChild(messageContainer);

    // Add the main message
    const message = document.createElement('div');
    message.style.color = 'red';
    message.style.fontSize = '2rem';
    message.style.fontWeight = 'bold';
    message.style.textAlign = 'center';
    messageContainer.appendChild(message);

    document.body.appendChild(blocker);

    // Typing animation for main message
    const text = " Don't touch my pineapple – one refresh for every offense! 🔄🔄🔄  ";
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        message.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    typeWriter();
  };

  return (
    <div className="relative group">
      <motion.button
        onClick={handleEmergencyStop}
        className="p-3 rounded-full 
                  bg-yellow-400 hover:bg-yellow-500
                  border-4 border-red-500
                  shadow-lg hover:shadow-xl
                  transition-all duration-300 ease-in-out
                  flex items-center justify-center
                  group relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl" role="img" aria-label="pineapple">🍍</span>
      </motion.button>
      
      {/* Tooltip */}
      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300
                    whitespace-nowrap bg-black text-white 
                    px-4 py-2 rounded-lg text-sm
                    pointer-events-none">
        Hover all you want, just don't click. 👀
        {/* Triangle pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full
                      border-8 border-transparent border-b-black"></div>
      </div>
    </div>
  );
};

export default EmergencyStop; 