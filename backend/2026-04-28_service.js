// Type      : Backend Utility
// Date      : 2026-04-28
// ───────────────────────────────────────────────────────
const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs/promises');

const UPLOAD_DIR = path.join(__
