// Type      : React Component
// Date      : 2026-10-22
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const SearchFilter = ({ items, searchKey = 'name', debounceTime = 300 }) => {
  const [inputValue, set
