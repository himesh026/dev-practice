// Type      : React Component
// Date      : 2026-09-02
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const FileDropzone = ({ onFilesDrop, accept = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
