import multer from "multer"
import { Request , Response  } from "express"

const storage = multer.diskStorage({
    destination : function(req:Request,file:Express.Multer.File,cb:any) {
        const allowedFiles = ["image/png","image/jpg","image/jpeg"];
        if(!allowedFiles.includes(file.mimetype)) {
            cb(new Error("This file type is not supported"))
            return
        }
        cb(null,"./src/uploads")
    },
    filename: function(req:Request, file:Express.Multer.File, cb:any) {
        cb(null,Date.now() +"-"+ file.originalname)
    },
})

export {
    multer,
    storage
}