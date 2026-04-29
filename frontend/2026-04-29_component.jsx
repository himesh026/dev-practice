// Type      : React Component
// Date      : 2026-04-29
// ───────────────────────────────────────────────────────
import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const FileDropzone = ({ accept, onFilesDropped }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [
