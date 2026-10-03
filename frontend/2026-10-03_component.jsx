// Type      : React Component
// Date      : 2026-10-03
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const Navbar = ({ links }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIs
