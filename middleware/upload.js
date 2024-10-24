const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.mp4' || ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      return cb(null, true);
    }
    cb(new Error('Only videos (mp4) and images (jpg, jpeg, png) are allowed!'));
  },
});

module.exports = upload;
