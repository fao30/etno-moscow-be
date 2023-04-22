const multer = require("multer");

const fileLimits = 20 * 1024 * 1024;

const allowedFileTypesPhoto = ["image/jpeg", "image/png", "image/jpg"];

const storageMedia = multer.diskStorage({
  destination: (req, file, cb) => {
    if (allowedFileTypesPhoto.includes(file.mimetype)) {
      cb(null, "./public/photos");
    } else {
      cb(null, "./public/videos");
    }
  },
  filename: (req, file, cb) => {
    if (allowedFileTypesPhoto.includes(file.mimetype)) {
      const uniqueSuffix = Date.now() + "-anonPict" + file.originalname;
      cb(null, uniqueSuffix);
    } else {
      const uniqueSuffix = Date.now() + "-anonVideo" + file.originalname;
      cb(null, uniqueSuffix);
    }
  },
});

const uploadMedia = multer({
  storage: storageMedia,
  limits: {
    fileSize: fileLimits,
  },
});

module.exports = { uploadMedia };
