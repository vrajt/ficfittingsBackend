const express = require("express");
const router = express.Router();
const {
  getAllHeatTests,
  getHeatTestById,
  createHeatTest,
  updateHeatTest,
  deleteHeatTest
} = require("../controllers/heatTestMasterController");

// Routes
router.get("/", getAllHeatTests);
router.get("/:id", getHeatTestById);
router.post("/", createHeatTest);
router.put("/:id", updateHeatTest);
router.delete("/:id", deleteHeatTest);

module.exports = router;
