// Type      : React Component
// Date      : 2026-08-15
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const BREAKPOINT = 768; // px

/**
 * A responsive navigation bar component with a mobile hamburger menu.
 *
 * @param {
