const multer = require("multer");
const path = require("path");

const fileFilterPicture = (req, file, cb) => {
	const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
	if (allowedFileTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Only .jpeg, .jpg and .png files are allowed!"), false);
	}
};

const storagePicture = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/photos");
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-picture" + file.originalname;
		cb(null, uniqueSuffix);
	},
});

const today = new Date();
const day = today.getDate().toString().padStart(2, "0");
const month = (today.getMonth() + 1).toString().padStart(2, "0"); // January is 0!
const year = today.getFullYear().toString();
const formattedDate = `${day}-${month}-${year}`;

const storageDocs = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/documents");
	},
	filename: (req, file, cb) => {
		const extension = file.originalname.substring(
			file.originalname.lastIndexOf(".")
		); // .xlsx
		const uniqueSuffix = formattedDate + " - Аннотация" + extension;
		cb(null, uniqueSuffix);
	},
});

class Upload {
	static picture = multer({
		storage: storagePicture,
		fileFilter: fileFilterPicture,
	});

	static file = multer({
		storage: storageDocs,
		fileFilter: function (req, file, cb) {
			if (!file.originalname.match(/\.(doc|docx)$/)) {
				// only allow .doc and .docx files
				return cb(new Error("Only .doc and .docx files are allowed!"));
			}
			cb(null, true);
		},
	});

	static upload = multer({
		storage: storageDocs,
		fileFilter: function (req, file, cb) {
			if (
				file.mimetype !==
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			) {
				cb(new Error("File type not supported"));
			} else {
				cb(null, true);
			}
		},
	});
}

module.exports = Upload;
