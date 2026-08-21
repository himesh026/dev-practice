// Type      : React Component
// Date      : 2026-08-21
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({
  value: controlledValue,
  defaultValue = 0,
  count = 5,
  size = 24,
