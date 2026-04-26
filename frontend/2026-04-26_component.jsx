// Type      : React Component
// Date      : 2026-04-26
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const CopyToClipboardButton = ({
  textToCopy,
  children = 'Copy',
  buttonStyle,
  iconStyle,
  feedbackDuration
