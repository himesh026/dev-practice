// Type      : React Component
// Date      : 2026-07-02
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const SearchFilter = ({ items, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, set
