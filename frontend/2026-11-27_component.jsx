// Type      : React Component
// Date      : 2026-11-27
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children, titleId, descriptionId, ...props }) => {
  const [
