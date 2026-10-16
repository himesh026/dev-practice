// Type      : React Component
// Date      : 2026-10-16
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const CopyToClipboardButton = ({ textToCopy, children, style, className }) => {
  const [isCopied, setIsCopied] = useState
