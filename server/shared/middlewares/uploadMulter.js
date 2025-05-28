const multer = require("multer");
const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.storage_path);

    cb(null, `uploads/${req.storage_path}`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the multer instance
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("file is not allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;
