// Type      : React Component
// Date      : 2026-05-04
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const RealtimeSearchFilter = ({ items, searchKey = 'name', placeholder = 'Search...' }) => {
  const [searchTerm, setSearchTerm] = useState('');
