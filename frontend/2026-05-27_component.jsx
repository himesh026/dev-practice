// Type      : React Component
// Date      : 2026-05-27
// ───────────────────────────────────────────────────────
import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children, titleId, descriptionId }) => {
  const modal
