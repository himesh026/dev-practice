// Type      : React Component
// Date      : 2026-04-03
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * An infinite scroll list component that fetches more data when the user scrolls to the bottom.
 *
 * @param {object} props - The
