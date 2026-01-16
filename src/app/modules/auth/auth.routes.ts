import { Router } from "express";
import { authController } from "./auth.controller.js";
import requestValidator from "../../middleware/requestValidator.js";
import { authValidation } from "./auth.validation.js";




const router  = Router();

// signup route
router.post("/signup",requestValidator(authValidation.signUp), authController.signup);
// signin route
router.post("/signin",requestValidator(authValidation.signIn), authController.signIn);
// forgot password route
router.post("/forgot-password", authController.forgotPassword);

// reset password route
router.post("/reset-password", authController.resetPassword);


export const authRoutes = router;