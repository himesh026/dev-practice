// Type      : React Component
// Date      : 2026-05-20
// ───────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * A button component that copies text to the clipboard and provides visual feedback.
 * Shows a checkmark icon for 2 seconds after successful copy, then reverts to
