const multer  = require("multer");

var inFile = false

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

exports.inFile = inFile
exports.upload = multer({
    dest:"images",
    fileFilter
});