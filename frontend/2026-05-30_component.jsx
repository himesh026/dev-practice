// Type      : React Component
// Date      : 2026-05-30
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

function MultiStepFormWizard({ onSubmit, initialData = {} }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [
