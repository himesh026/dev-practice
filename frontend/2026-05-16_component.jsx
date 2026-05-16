// Type      : React Component
// Date      : 2026-05-16
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const dropZoneStyles = {
  border: '2px dashed #ccc',
  borderRadius: '8px',
  padding: '20px',
