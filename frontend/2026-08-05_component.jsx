// Type      : React Component
// Date      : 2026-08-05
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CopyToClipboardButton = ({
  textToCopy,
  children,
  style,
  iconStyle,
  copyIcon: CopyIconComponent,
