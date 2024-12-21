import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import errorHandler from "../services/catchAyncError";
import OrderController from "../controllers/orderController";

const router:Router = Router();

router.route("/")
.post(authMiddleware.isAuthenticated,errorHandler(OrderController.createOrder))
.get(authMiddleware.isAuthenticated,errorHandler(OrderController.fetchMyOrders))
.delete(authMiddleware.isAuthenticated,errorHandler(OrderController.cancelMyOrder))

router.route("/verify")
.post(authMiddleware.isAuthenticated,errorHandler(OrderController.verifyTransaction))

export default router