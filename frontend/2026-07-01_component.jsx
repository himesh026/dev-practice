// Type      : React Component
// Date      : 2026-07-01
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024
