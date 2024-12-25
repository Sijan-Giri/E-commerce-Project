import { Router } from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import errorHandler from "../services/catchAyncError";
import OrderController from "../controllers/orderController";

const router:Router = Router();

router.route("/")
.post(authMiddleware.isAuthenticated,errorHandler(OrderController.createOrder))

router.route("/customer/")
.get(authMiddleware.isAuthenticated,errorHandler(OrderController.fetchMyOrders))

router.route("/customer/:id")
.patch(authMiddleware.isAuthenticated,errorHandler(OrderController.cancelMyOrder))
.get(authMiddleware.isAuthenticated,errorHandler(OrderController.fetchOrderDetails))

router.route("/verify")
.post(authMiddleware.isAuthenticated,errorHandler(OrderController.verifyTransaction))

router.route("/admin/payment/:id")
.patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(OrderController.changePaymentStatus))

router.route("/admin/:id")
.patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(OrderController.changeOrderStatus))
.delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(OrderController.deleteOrder))


export default router