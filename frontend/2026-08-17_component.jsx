// Type      : React Component
// Date      : 2026-08-17
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const InfiniteScrollList = ({
  fetchMore,
  renderItem,
  skeletonCount = 3,
  rootMargin = '0px',
