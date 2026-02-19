import express, { type Application } from "express";
import cors from "cors";
import { authRoutes } from "./app/modules/auth/auth.routes.js";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import { userRoutes } from "./app/modules/user/user.route.js";
import coockieParser from 'cookie-parser'


// define express application
const  app:Application = express()


app.use(express.json());
app.use(cors({origin:'http://localhost:3000',credentials:true}))
app.use(coockieParser());


app.get("/", (req, res) => {
  res.send("Vibly Server express app is running");
});

app.use('/api', [authRoutes,userRoutes])


// app exported here 
app.use(globalErrorHandler);
export default app;


