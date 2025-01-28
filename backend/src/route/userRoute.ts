import express,{Router} from "express"
import AuthController from "../controllers/userController"
import errorHandler from "../services/catchAyncError"
import authMiddleware, { Role } from "../middleware/authMiddleware"
const router:Router = express.Router()

router.route("/user").get(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(AuthController.fetchUser))

router.route("/user/:id")
.delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(AuthController.deleteUser))

router.route("/register").post(errorHandler(AuthController.registerUser))
router.route("/login").post(errorHandler(AuthController.loginUser))

export default router