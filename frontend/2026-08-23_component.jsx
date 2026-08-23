// Type      : React Component
// Date      : 2026-08-23
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const InfiniteScrollList = ({
  fetchMore,
  renderItem,
  itemKey,
  initialItems = [],
  hasMoreInitial
