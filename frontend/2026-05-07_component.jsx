// Type      : React Component
// Date      : 2026-05-07
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef {'light' | 'dark'} Theme
 */

const LOCAL_STORAGE_KEY = 'theme';

/**
 * Custom hook for
