// Type      : React Component
// Date      : 2026-05-28
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const InfiniteScrollList = ({ fetchMore, initialItems = [], hasMoreInitial = true, skeletonCount = 3, itemHeight = 50, render
