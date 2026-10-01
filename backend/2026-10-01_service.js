// Type      : Backend Utility
// Date      : 2026-10-01
// ───────────────────────────────────────────────────────
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const { promises: fs } = require('fs');
const crypto = require('crypto');

const UPLOAD_DIR = path.
