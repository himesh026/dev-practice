// Type      : React Component
// Date      : 2026-06-06
// ───────────────────────────────────────────────────────
import React, { useRef, useEffect, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
