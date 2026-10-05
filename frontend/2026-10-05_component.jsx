// Type      : React Component
// Date      : 2026-10-05
// ───────────────────────────────────────────────────────
import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({
  value,
  defaultValue = 0,
  onChange,
  count = 5,
  readOnly = false,
