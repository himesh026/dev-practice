// Type      : React Component
// Date      : 2026-09-09
// ───────────────────────────────────────────────────────
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const FileDragAndDropUploadZone = ({ onFilesDrop, accept }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [
