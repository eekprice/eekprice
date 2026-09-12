import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function useEasterEgg({ onDismiss } = {}) {
  const [showSecret, setShowSecret] = useState(false);
  const [easterEggCount, setEasterEggCount] = useState(() => {
    const savedCount = localStorage.getItem('fartCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const audioCtxRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('fartCount', easterEggCount.toString());
  }, [easterEggCount]);

  useEffect(() => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      audioCtxRef.current = new AudioCtx();
    }
  }, []);

  const playPing = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.4);
  };

  const handleSecretClick = () => {
    if (!showSecret) {
      playPing();
      setEasterEggCount((count) => count + 1);
    }
    setShowSecret(!showSecret);
  };

  const closeSecret = () => {
    if (!showSecret) return;
    setShowSecret(false);
    onDismiss?.();
  };

  const EasterEggModal = showSecret ? (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeSecret}
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <span className="text-9xl">🥚</span>
        <span className="text-white text-xl font-bold">Easter Eggs Found: {easterEggCount}</span>
      </motion.div>
    </motion.div>
  ) : null;

  return { showSecret, easterEggCount, handleSecretClick, EasterEggModal };
}
