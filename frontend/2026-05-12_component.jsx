// Type      : React Component
// Date      : 2026-05-12
// ───────────────────────────────────────────────────────
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const defaultCopyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const defaultSuccessIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
