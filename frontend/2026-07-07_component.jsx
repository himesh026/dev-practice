// Type      : React Component
// Date      : 2026-07-07
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({
  maxRating = 5,
  initialRating = 0,
  value,
  onChange,
