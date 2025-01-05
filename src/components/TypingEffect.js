import React, { useState, useEffect } from 'react';

function TypingEffect({ text, delay = 0, maxBlinksAfterTyping = 6 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [blinkCount, setBlinkCount] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const typingSpeed = 50;

  // Handle typing animation
  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText(''); // Reset text

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text]);

  // Handle cursor blinking
  useEffect(() => {
    if (!typingComplete) return;

    const cursorInterval = setInterval(() => {
      if (blinkCount >= maxBlinksAfterTyping * 2) { // Multiply by 2 because each blink is two states (on/off)
        setShowCursor(false);
        clearInterval(cursorInterval);
        return;
      }
      setShowCursor(prev => !prev);
      setBlinkCount(prev => prev + 1);
    }, 500); // 500ms for each blink state (1 second per full blink)

    return () => clearInterval(cursorInterval);
  }, [typingComplete, blinkCount, maxBlinksAfterTyping]);

  return (
    <span>
      {displayedText}
      {showCursor && <span className="cursor">|</span>}
    </span>
  );
}

export default TypingEffect; 