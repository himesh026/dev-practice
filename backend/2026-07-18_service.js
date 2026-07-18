// Type      : Backend Utility
// Date      : 2026-07-18
// ───────────────────────────────────────────────────────
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const { promises: fs } = require('fs');
const { v4: uuidv4 } = require('uuid');
