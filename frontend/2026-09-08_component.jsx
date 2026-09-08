// Type      : React Component
// Date      : 2026-09-08
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const AnimatedProgressStepper = ({ steps, currentStepIndex, layout = 'horizontal' }) => {
  const [lineProgress, setLineProgress] = useState(0);
