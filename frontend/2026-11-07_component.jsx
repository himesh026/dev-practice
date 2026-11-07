// Type      : React Component
// Date      : 2026-11-07
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const InfiniteScrollList = ({
  data,
  renderItem,
  fetchMore,
  hasMore,
  loaderCount = 3,
