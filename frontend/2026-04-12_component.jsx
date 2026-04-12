// Type      : React Component
// Date      : 2026-04-12
// ───────────────────────────────────────────────────────
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * A button component that copies text to the clipboard and provides visual feedback.
 * Shows a checkmark icon for 2 seconds after a successful copy, then reverts to a copy icon.
 *
 * @param {object} props - The component's props.
 * @param {string} props.textToCopy - The text string to be copied to the clipboard.
 * @param {React.ReactNode} [props.children] - Optional content to display inside the button, e.g., "Copy".
 * @param {string} [props.className] - Optional CSS class name for the button.
 * @param {object} [props.style] - Optional inline style object to apply to the button.
 */
function CopyToClipboardButton({ textToCopy, children, className, style }) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef(null);

  const defaultButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    cursor: 'pointer',
    fontSize: '1em',
    fontFamily: 'sans
