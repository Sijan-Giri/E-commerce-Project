import { Router } from "express";
import { multer,storage } from "../middleware/multerMiddleware";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import ProductController from "../controllers/productController";

const router:Router = Router();
const upload = multer({storage : storage})

router.route("/").post(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),upload.single("image"),ProductController.addProduct)

export default router