import express,{ Router } from "express";
import cartController from "../controllers/cartController";
import errorHandler from "../services/catchAyncError";
import authMiddleware from "../middleware/authMiddleware";
const router:Router = express.Router()

router.route("/")
.post(authMiddleware.isAuthenticated,errorHandler(cartController.addToCart))
.get(authMiddleware.isAuthenticated,errorHandler(cartController.getMyCartItems));

router.route("/:productId")
.delete(authMiddleware.isAuthenticated,errorHandler(cartController.deleteMyCartItems))
.patch(authMiddleware.isAuthenticated,errorHandler(cartController.UpdateMyCartItem))

export default router