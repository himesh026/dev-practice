// Type      : React Component
// Date      : 2026-11-14
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const InfiniteScrollList = ({
  items,
  fetchMore,
  hasMore,
  renderItem,
  loadingComponent,
  noMoreItemsComponent,
  rootMargin = '0px',
  threshold = 0.1,
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTargetRef = useRef(null);
  const observerRef = useRef(null);

  const handleObserver = useCallback(async (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      try {
        await fetchMore();
      } catch (error) {
        console.error('Failed to fetch more items:', error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  }, [fetchMore, hasMore, isLoadingMore]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin,
      threshold,
    });

    if (observerTargetRef.current) {
      observerRef.current.observe(observerTargetRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, rootMargin, threshold, items]); // Re-run effect if items change to reset observer if needed

  const observerTargetStyle = {
    height: '1px',
    margin: '10px 0',
    visibility: hasMore ? 'visible' : 'hidden',
