const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/users-avatars/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.jpg`);
    }
});

const upload = multer({ storage });

module.exports = upload;