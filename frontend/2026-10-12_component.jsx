// Type      : React Component
// Date      : 2026-10-12
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ResponsiveNavbar = ({ links }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [is
