import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import errorHandler from "../services/catchAyncError";
import OrderController from "../controllers/orderController";

const router:Router = Router();

router.route("/")
.post(authMiddleware.isAuthenticated,OrderController.createOrder)

export default router