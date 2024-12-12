import express,{ Router } from "express";
import cartController from "../controllers/cartController";
import errorHandler from "../services/catchAyncError";
import authMiddleware from "../middleware/authMiddleware";
const router:Router = express.Router()

router.route("/")
.post(authMiddleware.isAuthenticated,errorHandler(cartController.addToCart))
.get(authMiddleware.isAuthenticated,errorHandler(cartController.getMyCartItems))

export default router