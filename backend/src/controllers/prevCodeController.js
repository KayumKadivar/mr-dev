const prisma = require("../db/db");

// 1. API to add a new privilege (Add)
const addPrevCode = async (req, res) => {
  try {
    // Extract name from the body
    const { name } = req.body;

    // Validation : Check is name is provide
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Previlage name is required!",
      });
    }

    //insert the new recode into the database
    const newPrevCode = await prisma.privilege.create({
      data: {
        name: name,
      },
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "Previlage created successfully",
      data: newPrevCode,
    });
  } catch (err) {
    console.error("Error adding prevcode:", err);
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
    });
  }
};

// 2. API to fetch all privileges (View Existing)
const getAllPrevilage = async (req, res) => {
  try {
    // Retrieve all records from the prevcode table
    const allPrevCode = await prisma.privilege.findMany({
      orderBy: { id: "asc" },
    });

    // Send the data back to the frontend
    res.json({
      success: true,
      data: allPrevCode,
    });
  } catch (err) {
    console.error("Error Fatching previlage :", err);
    res.status(500).json({
      success: false,
      message: "Somthing went wrong!",
    });
  }
};

module.exports = {
  addPrevCode,
  getAllPrevilage,
};
