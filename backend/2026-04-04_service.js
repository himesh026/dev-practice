// Type      : Backend Utility
// Date      : 2026-04-04
// ───────────────────────────────────────────────────────
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs/promises');
const { randomUUID } = require('crypto');

// Configuration
const UPLOAD
