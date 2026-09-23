// Type      : React Component
// Date      : 2026-09-23
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const RealtimeSearchFilter = ({ items, searchKey = 'name', debounceTime = 300 }) => {
  const [searchTerm, setSearchTerm]
