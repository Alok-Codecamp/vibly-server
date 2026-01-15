import { Router } from "express";
import { authController } from "./auth.controller.js";
import requestValidator from "../../middleware/requestValidator.js";
import { authValidation } from "./auth.validation.js";




const router  = Router();


router.post("/signup",requestValidator(authValidation.signUp), authController.signup);

router.post("/signin",requestValidator(authValidation.signIn), authController.signIn);




export const authRoutes = router;