import React, { useState, useEffect, useRef } from 'react';

function TypingEffect({ text, delay = 0, maxBlinksAfterTyping = 6, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const typingSpeed = 50;

  onCompleteRef.current = onComplete;

  useEffect(() => {
    let currentIndex = 0;
    let intervalId;

    const delayTimeout = setTimeout(() => {
      setShowCursor(true);
      intervalId = setInterval(() => {
        currentIndex += 1;
        setDisplayedText(text.substring(0, currentIndex));
        if (currentIndex >= text.length) {
          clearInterval(intervalId);
          setTypingComplete(true);
          onCompleteRef.current?.();
          onCompleteRef.current = null;
        }
      }, typingSpeed);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(intervalId);
    };
  }, [text, delay]);

  useEffect(() => {
    if (!typingComplete) return;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
      setBlinkCount((prev) => prev + 1);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [typingComplete]);

  useEffect(() => {
    if (typingComplete && blinkCount >= maxBlinksAfterTyping * 2) {
      setShowCursor(false);
    }
  }, [typingComplete, blinkCount, maxBlinksAfterTyping]);

  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="invisible" aria-hidden="true">{text}|</span>
      <span className="absolute left-0 top-0">
        {displayedText}
        <span className={`cursor ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
      </span>
    </span>
  );
}

export default TypingEffect;
