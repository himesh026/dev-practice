// Type      : React Component
// Date      : 2026-05-06
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef {'light' | 'dark'} Theme
 */

/**
 * Custom hook for managing dark/light theme with persistence and CSS variable application
