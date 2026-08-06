// Type      : React Component
// Date      : 2026-08-06
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

function RealtimeSearchFilter({ items, placeholder }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch
