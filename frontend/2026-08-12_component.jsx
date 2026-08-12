// Type      : React Component
// Date      : 2026-08-12
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext(null);

const getSystemPreference = () => window.matchMedia('(prefers-color-scheme: dark)').matches
