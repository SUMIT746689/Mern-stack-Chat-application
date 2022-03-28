//external file handle
const multer = require('multer');
const createError = require('http-errors');

//internal middleware
const path = require('path');

//avatar upload things handle
function avatarUploadHandle (
    folderName,
    acceptFiletype,
    errorMessage
) {
    const filePath = path.join(__dirname,'../public',folderName);
    const storage = multer.diskStorage({
        destination : function (req,file,cb){
            cb(null,filePath);
        },
        filename : function (req,file,cb){
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                .replace(fileExt,'')
                .split(' ')
                .join('-')+'-'+Date.now();
            cb(null,fileName+fileExt);
        }
    });

    const upload = multer({
        storage,
        limits : {
            fileSize : 1000000
        },
        fileFilter : function(req,file,cb){
            if(acceptFiletype.includes(file.mimetype)){
                cb(null,true);
            }
            else{
                cb(createError(errorMessage));
            }
        }
    })
    return upload ; 
    
}

module.exports = avatarUploadHandle ;