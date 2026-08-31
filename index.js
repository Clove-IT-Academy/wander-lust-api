// const express = require("express"); // import express but old technique
import express from "express"; // import express using ES6 module syntax

const app = express();
const PORT = process.env.PORT;

// traditional function declaration
// function helloWorld(req, res) {
//   res.send("Hello, World!");
// }

// const helloWorldArrow = (req, res) => {
//   res.send("Hello, World!");
// };

app.get("/", (req, res) => {
  res.send("Hello, World!");
}); // using arrow function as a callback

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
