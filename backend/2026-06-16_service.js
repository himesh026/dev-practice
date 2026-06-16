// Type      : Backend Utility
// Date      : 2026-06-16
// ───────────────────────────────────────────────────────
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs/promises');

//
