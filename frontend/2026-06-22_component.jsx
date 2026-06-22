// Type      : React Component
// Date      : 2026-06-22
// ───────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AnimatedProgressStepper = ({ steps, currentStepIndex, color = '#4CAF50' }) => {
  const [progressWidth, setProgressWidth]
