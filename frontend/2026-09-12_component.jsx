// Type      : React Component
// Date      : 2026-09-12
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ResponsiveNavbar = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
