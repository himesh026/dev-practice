// Type      : React Component
// Date      : 2026-10-31
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

export const StarRating = ({
  value: controlledValue,
  defaultValue = 0,
  maxStars = 5,
  readOnly = false
