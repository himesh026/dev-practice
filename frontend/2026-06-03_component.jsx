// Type      : React Component
// Date      : 2026-06-03
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StarRating = ({
  value,
  defaultValue = 0,
  count = 5,
  onChange,
  readOnly = false
