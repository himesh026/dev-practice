// Type      : React Component
// Date      : 2026-08-31
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function FileDropzone({ accept, onFilesDrop }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, set
