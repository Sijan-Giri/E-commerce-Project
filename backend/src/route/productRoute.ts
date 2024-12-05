import { Router } from "express";
import { multer,storage } from "../middleware/multerMiddleware";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import ProductController from "../controllers/productController";
import errorHandler from "../services/catchAyncError";

const router:Router = Router();
const upload = multer({storage : storage})

router.route("/")
.post(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),upload.single("image"),ProductController.addProduct)
.get(errorHandler(ProductController.getAllProducts))


router.route("/:id")
.get(errorHandler(ProductController.getSingleProduct))
.delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(ProductController.deleteProduct))
.patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),ProductController.updateProduct)

export default router