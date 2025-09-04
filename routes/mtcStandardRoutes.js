const express = require("express");
const router = express.Router();
const controller = require("../controllers/mtcStandardController");

// CRUD Routes
router.post("/", controller.createMtcStandard);       // Create
router.get("/", controller.getAllMtcStandards);       // Read all
router.get("/:id", controller.getMtcStandardById);    // Read one
router.put("/:id", controller.updateMtcStandard);     // Update
router.delete("/:id", controller.deleteMtcStandard);  // Delete

module.exports = router;
