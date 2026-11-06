// Type      : React Component
// Date      : 2026-11-06
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
