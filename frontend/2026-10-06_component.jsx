// Type      : React Component
// Date      : 2026-10-06
// ───────────────────────────────────────────────────────
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({
  maxRating = 5,
  value,
  defaultValue = 0,
  onChange,
  readOnly = false
