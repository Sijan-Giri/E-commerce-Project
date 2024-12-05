import { Router } from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import errorHandler from "../services/catchAyncError";
import categoryController from "../controllers/categoryController";
const router = Router();

router.route("/").post(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(categoryController.addCategory))
.get(categoryController.getAllCategory)

router.route("/:id").
delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(categoryController.deleteCategory))
.get(errorHandler(categoryController.getSingleCategory))
.patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(categoryController.updateCategory))

export default router