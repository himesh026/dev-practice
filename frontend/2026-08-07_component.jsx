// Type      : React Component
// Date      : 2026-08-07
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const SearchFilter = ({ items, searchKey = 'text', debounceTime = 300 }) => {
  const [searchTerm,
