const express = require("express");
const router = express.Router();
const {
  createTcRemarksFix,
  getAllTcRemarksFix,
  getTcRemarksFixById,
  updateTcRemarksFix,
  deleteTcRemarksFix,
} = require("../controllers/tcRemarksFixController");

// Routes
router.post("/", createTcRemarksFix);       // Create
router.get("/", getAllTcRemarksFix);        // Get all
router.get("/:id", getTcRemarksFixById);    // Get one
router.put("/:id", updateTcRemarksFix);     // Update
router.delete("/:id", deleteTcRemarksFix);  // Delete

module.exports = router;
