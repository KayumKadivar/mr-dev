const express = require("express");
const app = express();

const adminRoutes = require("./routes/adminRoutes");

// Middleware to parse incoming JSON payloads (req.body)
app.use(express.json());

// Custom Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} Request received at: ${req.url}`);
  
  // Pass control to the next middleware or route handler
  next(); 
});


// Register API routes
app.use("/api/admin", adminRoutes);

module.exports = app;
