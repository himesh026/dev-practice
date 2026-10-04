// Type      : React Component
// Date      : 2026-10-04
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const NAVBAR_BREAKPOINT = 768;

const Navbar = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
