// Type      : React Component
// Date      : 2026-11-20
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const THEME_STORAGE_KEY = 'app-theme';
const LIGHT_THEME_VARS = {
  '--bg-color': '#ffffff',
