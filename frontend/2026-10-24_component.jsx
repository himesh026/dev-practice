// Type      : React Component
// Date      : 2026-10-24
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const CopyToClipboardButton = ({
  textToCopy,
  label,
  copyIcon,
  copiedIcon,
  feedbackDuration =
