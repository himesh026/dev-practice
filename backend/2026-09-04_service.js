// Type      : Backend Utility
// Date      : 2026-09-04
// ───────────────────────────────────────────────────────
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const U
