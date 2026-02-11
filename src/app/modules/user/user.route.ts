// User Routes

import { Router } from "express";
import authValidator from "../../middleware/authValidator.js";
import { UserRole } from "./user.interface.js";
import { userController } from "./user.controller.js";


const router = Router();


router.get("/user/my-profile",authValidator([UserRole.USER,UserRole.ADMIN]),userController.getUserProfile)
router.get("/user/all-users",authValidator([UserRole.ADMIN]),userController.getAllUsers)


export const userRoutes = router;