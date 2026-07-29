// Type      : React Component
// Date      : 2026-07-29
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

export function DragDropUploadZone({ accept = 'image/*', onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file
