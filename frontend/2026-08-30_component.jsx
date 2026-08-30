// Type      : React Component
// Date      : 2026-08-30
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ResponsiveNavbar = ({ links, breakpoint = 768, navStyle, linkStyle, activeLinkStyle, hamburgerStyle, hamburgerLineStyle, mobileMenuStyle }) => {
