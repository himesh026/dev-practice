// Type      : React Component
// Date      : 2026-10-18
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const InfiniteScrollList = ({
  fetchMore,
  hasMore,
  renderItem,
  skeletonCount = 3,
  initialItems
