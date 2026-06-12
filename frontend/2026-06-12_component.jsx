// Type      : React Component
// Date      : 2026-06-12
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const THEME_STORAGE_KEY = 'app-theme';
const LIGHT_THEME = 'light';
const DARK_THEME =
