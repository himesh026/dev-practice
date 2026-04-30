// Type      : Backend Utility
// Date      : 2026-04-30
// ───────────────────────────────────────────────────────
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');

// --- Configuration ---
const UPLOAD
