// Type      : React Component
// Date      : 2026-07-14
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * A real-time search filter component with debounced input and highlighted results.
 * @param {object} props - The component props
