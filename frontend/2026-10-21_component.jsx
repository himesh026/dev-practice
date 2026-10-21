// Type      : React Component
// Date      : 2026-10-21
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const calculateTimeLeft = (targetDate) => {
  const now = new Date().getTime();
  const target = new Date(targetDate
