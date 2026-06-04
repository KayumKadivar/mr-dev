const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController");

// POST request for login functionality
router.post("/login", loginAdmin)

module.exports = router;