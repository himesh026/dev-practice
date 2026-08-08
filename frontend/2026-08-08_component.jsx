// Type      : React Component
// Date      : 2026-08-08
// ───────────────────────────────────────────────────────
import React, { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
