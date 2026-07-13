// Type      : React Component
// Date      : 2026-07-13
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const defaultRenderSkeleton = () => (
  <div style={{ height: '50px', backgroundColor: '#f0f0f0', margin:
