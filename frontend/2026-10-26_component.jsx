// Type      : React Component
// Date      : 2026-10-26
// ───────────────────────────────────────────────────────
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * A button component that copies text to the clipboard and provides visual feedback.
 * Shows a checkmark icon for 2 seconds after successful copy, then reverts to a
