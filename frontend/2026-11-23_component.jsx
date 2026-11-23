// Type      : React Component
// Date      : 2026-11-23
// ───────────────────────────────────────────────────────
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 102
