// Type      : React Component
// Date      : 2026-09-11
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const focusableElementsSelector =
  'a[href], button:not([disabled]), textarea:not([
