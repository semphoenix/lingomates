const express = require("express"); //importing express
const app = require("./app");
const cors = require("cors"); //imorting cors
const morgan = require("morgan"); // Import the Morgan middleware for logging
const {PORT} = require("./config")


// Middleware
app.use(cors()); // Enable CORS middleware to handle cross-origin requests
app.use(morgan("dev")); // Use Morgan middleware with 'dev' format for request logging
app.use(express.json()); // Parse incoming requests with JSON payloads

// Start the server
app.listen(PORT, () => {
    //console logging the iniation of the server
    console.log(`Server running  http://localhost:${PORT}`);
  });