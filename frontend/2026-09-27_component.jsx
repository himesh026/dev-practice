// Type      : React Component
// Date      : 2026-09-27
// ───────────────────────────────────────────────────────
import React, { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const previouslyFocused
