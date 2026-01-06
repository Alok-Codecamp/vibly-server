import mongoose from "mongoose";
import app from "./app.js";
import {Server} from "http";




const port = process.env.PORT || 5000;

let server: Server;
const mongoDbUri = "mongodb+srv://alok3:bAy14qACS3WoWENQ@database1.tsbog.mongodb.net/vibly?retryWrites=true&w=majority";
async function main(){
  try{
  await mongoose.connect(mongoDbUri);
  server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
  }
  catch(err){
    console.error("Error starting the server:", err);
    process.exit(1);
  }
}

main();


process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err); 
  if (server) {
    server.close(() => {
      process.exit(1); 
    }); 
  } else {
    process.exit(1); 
  }
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  
    process.exit(1); 

});