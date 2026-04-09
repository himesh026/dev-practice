// Type      : React Component
// Date      : 2026-04-09
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const SearchFilter = ({ list, placeholder, noResultsMessage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm,
