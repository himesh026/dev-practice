// Type      : React Component
// Date      : 2026-10-11
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const InfiniteScrollList = ({
  items,
  renderItem,
  fetchMore,
  hasMore,
  loadingIndicatorCount = 3,
