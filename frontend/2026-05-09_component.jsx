// Type      : React Component
// Date      : 2026-05-09
// ───────────────────────────────────────────────────────
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const SkeletonLoader = ({ count }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <div
                key
