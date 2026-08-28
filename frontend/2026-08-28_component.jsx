// Type      : React Component
// Date      : 2026-08-28
// ───────────────────────────────────────────────────────
import React from 'react';
import PropTypes from 'prop-types';

const AnimatedProgressStepper = ({ steps, currentStep, direction }) => {
  const stepperContainerStyle = {
    display: 'flex',
    flexDirection: direction === 'horizontal' ? 'row
