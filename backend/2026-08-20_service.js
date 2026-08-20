// Type      : Backend Utility
// Date      : 2026-08-20
// ───────────────────────────────────────────────────────
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');

const UPLOAD_DIR = path.
