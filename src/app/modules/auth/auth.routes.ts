import { Router } from "express";
import { authController } from "./auth.controller.js";
import requestValidator from "../../middleware/requestValidator.js";
import { authValidation } from "./auth.validation.js";




const router  = Router();

// signup route
router.post("/auth/signup",requestValidator(authValidation.signUp), authController.signup);
// signin route
router.post("/auth/signin",requestValidator(authValidation.signIn), authController.signIn);
// generate refresh token route
router.post("/auth/refresh-token",authController.generateRefreshToken)
// forgot password route
router.post("/auth/forgot-password", authController.forgotPassword);

// reset password route
router.post("/auth/reset-password", authController.resetPassword);


export const authRoutes = router;