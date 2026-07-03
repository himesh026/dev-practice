// Type      : React Component
// Date      : 2026-07-03
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const CountdownTimer = ({ targetDate, onExpire }) => {
  const calculateTimeLeft = useCallback(() => {
    const target = new Date(target
