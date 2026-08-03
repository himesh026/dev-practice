// Type      : React Component
// Date      : 2026-08-03
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ResponsiveNavbar = ({ links, brandName = 'Brand', activeHref: initialActiveHref }) => {
  const [isOpen, setIsOpen] = useState(false);
