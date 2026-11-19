// Type      : React Component
// Date      : 2026-11-19
// ───────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MOBILE_BREAKPOINT = 768; // px

const Navbar = ({ links }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen
