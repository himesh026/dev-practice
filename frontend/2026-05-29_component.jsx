// Type      : React Component
// Date      : 2026-05-29
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const calculateTimeLeft = (targetDate) => {
  const target = new Date(targetDate).getTime();
  const now = new Date
