const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController");
const { addPrevCode, getAllPrevilage } = require("../controllers/prevCodeController");

// POST request for login functionality
router.post("/login", loginAdmin);
router.post("/prevcode", addPrevCode);
router.get("/prevcode", getAllPrevilage);

module.exports = router;
