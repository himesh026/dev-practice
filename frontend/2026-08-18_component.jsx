// Type      : React Component
// Date      : 2026-08-18
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const calculateTimeLeft = (targetDate) => {
  const now = new Date().getTime();
  const target = new Date(targetDate
