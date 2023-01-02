const multer = require('multer');
const response = require('../helpers/response');
const middleware = {}

middleware.file = (req, res, next) => {
    const storage = multer.diskStorage ({
        destination: (req, file, cb) => {
            cb(null, "public/image")
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1]
            if(ext !== "png" && ext !== "jpg" && ext !== "jpeg") {
                cb(new Error('File tidak diijinkan'))

            } else {
                cb(null, `${Date.now()}.${ext}`)
            }

        }
    })
    const limits = {fileSize: 5 * 1024 * 1024}
    const upload = multer({storage, limits}).single("image")

    upload(req, res, (error) => {
        if(error instanceof multer.MulterError){
            return response(res, 500, error.message)
        } else if (error) {
            return response(res, 500, error.message)
        } else {
            next()
        }
    })
}

module.exports = middleware



// module.exports = {
//     file: (req, res, next) => {
//         const storage = multer.diskStorage ({
//             destination: (req, file, cb) => {
//                 cb(null, "public/image")
//             },
//             filename: (req, file, cb) => {
//                 const ext = file.mimetype.split("/")[1]
//                 if(ext !== "png" && ext !== "jpg" && ext !== "jpeg") {
//                     cb(new Error('File tidak diijinkan'))

//                 } else {
//                     cb(null, `${Date.now()}.${ext}`)
//                 }

//             }
//         })
//         const limits = {fileSize: 5 * 1024 * 1024}
//         const upload = multer({storage, limits}).single("image")

//         upload(req, res, (error) => {
//             if(error instanceof multer.MulterError){
//                 return response(res, 500, error.message)
//             } else if (error) {
//                 return response(res, 500, error.message)
//             } else {
//                 next()
//             }
//         })
//     }
// }