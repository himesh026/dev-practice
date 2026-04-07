// Type      : React Component
// Date      : 2026-04-07
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const THEME_STORAGE_KEY = 'theme';
const DEFAULT_THEME = 'light';

/**
 * A React hook for managing dark/light theme state
