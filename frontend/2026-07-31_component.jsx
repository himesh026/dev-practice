// Type      : React Component
// Date      : 2026-07-31
// ───────────────────────────────────────────────────────
import React, { useState, useCallback, useMemo } from 'react';

/**
 * @typedef {object} StepConfig
 * @property {string} title - The title of the step.
 * @property {Array<string>} fields - List of field names for this step.
