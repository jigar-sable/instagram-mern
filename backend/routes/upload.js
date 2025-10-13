const express = require("express");
const upload = require("../config/multer.js");

const router = express.Router();

// POST /api/upload
router.post("/upload", upload.single("file"), (req, res) => {
  // req.file.path contains the Cloudinary URL
  res.json({ url: req.file.path });
});

module.exports = router;
