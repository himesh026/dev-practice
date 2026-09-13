// Type      : React Component
// Date      : 2026-09-13
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * A button component that copies text to the clipboard and provides visual feedback.
 * Shows a checkmark icon for 2 seconds after a successful copy, then reverts
