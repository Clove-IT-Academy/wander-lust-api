// const express = require("express"); // import express but old technique
import express from "express"; // import express using ES6 module syntax
import connectDB from "./config/database.js";
import handlers from "./handlers/index.js";
import errorMiddleware from "./middlewares/error.js";
import { authMiddleware } from "./middlewares/auth.js";

const app = express();
const PORT = process.env.PORT;

// traditional function declaration
// function helloWorld(req, res) {
//   res.send("Hello, World!");
// }

// const helloWorldArrow = (req, res) => {
//   res.send("Hello, World!");
// };

connectDB(); // Call the function to establish database connection

app.get("/", (req, res) => {
  res.send("Hello, World!");
}); // using arrow function as a callback

app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/", handlers);
app.use(errorMiddleware); // Middleware to handle errors
app.use(authMiddleware); //Middleware to check login status of user

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
