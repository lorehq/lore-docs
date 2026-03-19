import { useEffect, useState } from 'react';

const THEMES = [
  ['mocha', 'Mocha'],
  ['macchiato', 'Macchiato'],
  ['frappe', 'Frappe'],
  ['latte', 'Latte'],
  ['solarized', 'Solarized Dark'],
  ['solarized-light', 'Solarized Light'],
] as const;

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('mocha');

  useEffect(() => {
    const saved = localStorage.getItem('tui-theme') || 'mocha';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  function changeTheme(next: string) {
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('tui-theme', next);
  }

  return (
    <div className="theme-switcher" aria-label="Theme switcher">
      {THEMES.map(([value, label]) => (
        <button
          key={value}
          type="button"
          className={`theme-btn ${theme === value ? 'active' : ''}`}
          onClick={() => changeTheme(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
