import { Router } from "express";
import { authController } from "./auth.controller.js";


const router  = Router();


router.post("/signin", authController.signup);





export const authRoutes = router;