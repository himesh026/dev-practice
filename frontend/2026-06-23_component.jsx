// Type      : React Component
// Date      : 2026-06-23
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const FileDropzone = ({ onFilesDrop, accept, maxFiles, maxSize }) => {
    const [isDragging, setIsDragging] = useState
