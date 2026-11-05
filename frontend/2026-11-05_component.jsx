// Type      : React Component
// Date      : 2026-11-05
// ───────────────────────────────────────────────────────
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({
  value,
  defaultValue = 0,
  count = 5,
  precision = 0.5,
