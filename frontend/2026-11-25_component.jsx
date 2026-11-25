// Type      : React Component
// Date      : 2026-11-25
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Helper function to determine the initial theme.
 * Checks localStorage first, then system preference, defaults to 'light'.
 * @returns {'light' | '
