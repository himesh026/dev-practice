// Type      : Backend Utility
// Date      : 2026-09-15
// ───────────────────────────────────────────────────────
const path = require('path');
const { promises: fs } = require('fs');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const sharp = require('sharp');

// --- Configuration ---
const
