// Type      : React Component
// Date      : 2026-06-28
// ───────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
