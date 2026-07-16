// Type      : React Component
// Date      : 2026-07-16
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const THEMES = {
  light: {
    '--primary-bg': '#ffffff',
    '--primary-text': '#33333
