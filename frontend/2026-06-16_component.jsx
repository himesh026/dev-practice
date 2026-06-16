// Type      : React Component
// Date      : 2026-06-16
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * A React hook for managing dark/light theme preference with persistence.
 * It stores the theme in localStorage and applies CSS variables to the document root.
 *
 * @returns {{
 *   theme: 'light' | 'dark',
 *   toggleTheme: () => void
 * }} An object containing the current theme and a function to toggle it.
 */
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');

    if (theme === 'dark') {
      root.style.setProperty('--bg-color', '#1a202c');
      root.style.setProperty('--text-color', '#e2e8f0');
      root.style.setProperty('--btn-bg', '#4a5568');
      root.style.setProperty('--btn-text', '#e2e8f0');
    } else {
      root.style.setProperty('--bg-color', '#ffffff');
      root.style.setProperty('--text-color', '#2d3748');
      root.style.setProperty('--btn-bg', '#cbd5e0');
      root.style.setProperty('--btn-text', '#2d3748');
    }
  }, [theme]);
