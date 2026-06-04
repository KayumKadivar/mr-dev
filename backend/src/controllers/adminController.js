const prisma = require("../db/db");

loginAdmin   = async (req, res) => {
  try {
    // 1. Extract username and password from the request body
    const { username, password } = req.body;

    // 2. Validation: Check if both fields are provided
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required!",
      });
    }

    // 3. Find the user in the database
    const admin = await prisma.adminUser.findUnique({
      where: { username: username },
    });

    // 4. Verify user exists and password matches
    if (!admin || admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    // 5. Send success response (excluding password for security)
    res.json({
      success: true,
      message: "Login Successfully!",
      data: {
        id: admin.id,
        username: admin.username,
      },
    });

  } catch (err) {
    console.error("Login API Error:", err);
    res.status(500).json({ success: false, message: "Somthing went wrong" });
  }
};

module.exports = { loginAdmin  };
