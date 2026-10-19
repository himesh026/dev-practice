// Type      : React Component
// Date      : 2026-10-19
// ───────────────────────────────────────────────────────
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const previously
