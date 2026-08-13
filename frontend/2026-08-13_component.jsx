// Type      : React Component
// Date      : 2026-08-13
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const StarRating = (props) => {
  const {
    value: controlledValue,
    defaultValue,
    count = 5,
