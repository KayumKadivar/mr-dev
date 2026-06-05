const prisma = require("../db/db");

// Add new user
const createNewUser = async (req, res) => {
  try {
    const { ecnumber, username, password, usergrade } = req.body;

    //
    if (!ecnumber || !username || !password || !usergrade) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required!",
      });
    }

    if (String(ecnumber) !== String(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be the same as Ecnumber!",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        ecnumber: Number(ecnumber),
        username: username,
        password : password,
        usergrade: Number(usergrade),
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: newUser,
    });
  } catch (err) {
    console.error("Error adding prevcode:", err);
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
    });
  }
};

module.exports = { createNewUser };
