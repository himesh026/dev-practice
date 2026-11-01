// Type      : Backend Utility
// Date      : 2026-11-01
// ───────────────────────────────────────────────────────
const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { promises: fs } = require('fs');

const UPLOAD_DIR = path
