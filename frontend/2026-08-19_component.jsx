// Type      : React Component
// Date      : 2026-08-19
// ───────────────────────────────────────────────────────
import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 10
