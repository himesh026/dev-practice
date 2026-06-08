// Type      : React Component
// Date      : 2026-06-08
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef {'light' | 'dark'} Theme
 */

/**
 * A React hook for managing dark/light theme state with persistence to localStorage.
 * It applies the theme by setting a `data-theme` attribute on the `<html>` element.
 *
 * @returns {{theme: Theme, toggleTheme: () => void}} An object containing the current theme and a function to toggle it.
 */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default to light on server-side or initial render
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
}

const buttonStyles = {
  background: 'var(--theme-toggle-bg, #f0f0f0)',
  color: 'var(--theme-toggle-color, #333)',
  border: '1px solid var(--theme-toggle-border, #ccc)',
  borderRadius: '20px',
  padding: '8px 15px',
  cursor: 'pointer',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3
