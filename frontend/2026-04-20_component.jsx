// Type      : React Component
// Date      : 2026-04-20
// ───────────────────────────────────────────────────────
import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StarRating = ({
  value,
  defaultValue = 0,
  onChange,
  maxStars = 5,
  readOnly =
