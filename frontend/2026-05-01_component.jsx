// Type      : React Component
// Date      : 2026-05-01
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Custom hook for managing dark/light theme with persistence.
 * @returns {{theme: string, toggleTheme: function}} An object containing the current theme
