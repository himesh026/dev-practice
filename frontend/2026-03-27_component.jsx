// Type      : React Component
// Date      : 2026-03-27
// ───────────────────────────────────────────────────────
import React, { useRef, useEffect, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children, ariaLabelledBy, ariaDescribedBy }) => {
  const
