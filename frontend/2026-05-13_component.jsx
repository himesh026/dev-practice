// Type      : React Component
// Date      : 2026-05-13
// ───────────────────────────────────────────────────────
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const MultiStepFormWizard = ({ steps, onSubmit, initialData = {} }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
