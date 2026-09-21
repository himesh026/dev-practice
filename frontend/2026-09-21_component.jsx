// Type      : React Component
// Date      : 2026-09-21
// ───────────────────────────────────────────────────────
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

function MultiStepFormWizard({ steps, onSubmit, initialData = {} }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [
