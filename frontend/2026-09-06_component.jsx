// Type      : React Component
// Date      : 2026-09-06
// ───────────────────────────────────────────────────────
import React from 'react';
import PropTypes from 'prop-types';

const AnimatedProgressStepper = ({ steps, currentStep }) => {
  const stepperContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent:
