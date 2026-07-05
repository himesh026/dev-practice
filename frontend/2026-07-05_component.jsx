// Type      : React Component
// Date      : 2026-07-05
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef {'success' | 'error' | 'info' | 'warning'} ToastType
 */

/**
 * @typedef {object} Toast
