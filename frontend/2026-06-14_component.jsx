// Type      : React Component
// Date      : 2026-06-14
// ───────────────────────────────────────────────────────
import React from 'react';
import PropTypes from 'prop-types';

const AnimatedProgressStepper = ({
  steps,
  currentStep,
  lineColor = '#e0e0e0',
  activeLineColor = '#4CAF50',
  stepColor
