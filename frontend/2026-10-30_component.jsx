// Type      : React Component
// Date      : 2026-10-30
// ───────────────────────────────────────────────────────
import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

export function FileDropzone({ onFileChange, acceptedFileTypes = 'image/*,application/pdf', children }) {
  const [isDragging, setIsDragging
