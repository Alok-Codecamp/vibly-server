import express, { type Application } from "express";
import cors from "cors";
import { authRoutes } from "./app/modules/auth/auth.routes.js";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import { userRoutes } from "./app/modules/user/user.route.js";


// define express application
const  app:Application = express()


app.use(express.json());
app.use(cors())



app.get("/", (req, res) => {
  res.send("Vibly Server express app is running");
});

app.use('/api', [authRoutes,userRoutes])


// app exported here 
app.use(globalErrorHandler);
export default app;


