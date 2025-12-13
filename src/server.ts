import app from "./app.js";





const port = process.env.PORT || 5000;

let server;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})