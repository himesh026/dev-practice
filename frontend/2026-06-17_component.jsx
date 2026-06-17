// Type      : React Component
// Date      : 2026-06-17
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const injectGlobalThemeStyles = () => {
  const styleId = 'theme-transition-style';
  if (!document.getElementById(styleId)) {
