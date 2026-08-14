// Type      : React Component
// Date      : 2026-08-14
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * RealTimeSearchFilter component for filtering a list with a debounced input and highlighting matches.
 * It provides a search input that
