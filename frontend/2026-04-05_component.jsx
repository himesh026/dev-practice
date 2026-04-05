// Type      : React Component
// Date      : 2026-04-05
// ───────────────────────────────────────────────────────
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const FileDropzone = ({ acceptedFileTypes, onFilesDropped }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file,
