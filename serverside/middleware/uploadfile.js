import multer from 'multer'
const storage = multer.diskStorage({
    destination: './output',
    filename: (req, file, cb) =>{
        return cb(null, file.originalname + Date.now())
    }
})
const upload = multer({
    storage: storage,
})
module.exports=upload;