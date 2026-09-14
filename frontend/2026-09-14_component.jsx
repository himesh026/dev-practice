// Type      : React Component
// Date      : 2026-09-14
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = window.localStorage.
