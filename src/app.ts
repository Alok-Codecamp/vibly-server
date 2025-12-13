import express, { type Application } from "express";
import cors from "cors";
import { authRoutes } from "./app/modules/auth/auth.routes.js";


// define express application
const  app:Application = express()


app.use(express.json());
app.use(cors())



app.get("/", (req, res) => {
  res.send("Vibly Server express app is running");
});

app.use('/api/auth', authRoutes)


// app exported here 
export default app;


