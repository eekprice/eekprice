import { useCallback, useState } from 'react';

const STORAGE_KEY = 'theme';

const readIsDark = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

// Dark mode is a class on <html>. src/index.js sets it before first paint from
// localStorage or the OS preference; this hook flips it and remembers the choice.
export function useTheme() {
  const [isDark, setIsDark] = useState(readIsDark);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      // storage can be blocked; the toggle still works for this page view
    }
    setIsDark(next);
  }, []);

  return { isDark, toggle };
}
