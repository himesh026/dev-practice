// Type      : React Component
// Date      : 2026-09-10
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const RealtimeSearchFilter = ({ items, searchKey = null }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [
