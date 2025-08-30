const express = require("express");
const router = express.Router();
const {
  createDimStandard,
  getAllDimStandards,
  getDimStandardById,
  updateDimStandard,
  deleteDimStandard
} = require("../controllers/dimStandardController");

// CRUD Routes
router.post("/", createDimStandard);       // Create
router.get("/", getAllDimStandards);       // Read All
router.get("/:id", getDimStandardById);    // Read One
router.put("/:id", updateDimStandard);     // Update
router.delete("/:id", deleteDimStandard);  // Delete

module.exports = router;
