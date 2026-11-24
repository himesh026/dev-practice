// Type      : React Component
// Date      : 2026-11-24
// ───────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ links, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
