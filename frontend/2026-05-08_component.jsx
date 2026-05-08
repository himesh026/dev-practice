// Type      : React Component
// Date      : 2026-05-08
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const FileDropzone = ({ mimeTypes = [], onFilesAccepted }) => {
  const [isDragging, setIsDragging] = useState(false);
