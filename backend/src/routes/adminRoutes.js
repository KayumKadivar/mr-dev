const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController");
const { addPrevCode, getAllPrevilage } = require("../controllers/prevCodeController");
const { createNewUser } = require("../controllers/userController");

// POST request for login functionality
router.post("/login", loginAdmin);
router.post("/prevcode", addPrevCode);
router.get("/prevcode", getAllPrevilage);
router.post("/createUser", createNewUser);

module.exports = router;
