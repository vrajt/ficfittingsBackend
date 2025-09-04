const express = require("express");
const router = express.Router();
const controller = require("../controllers/tcHeatTreatController");

router.get("/", controller.getAll);         // Get all
router.get("/:id", controller.getById);     // Get by ID
router.post("/", controller.create);        // Create new
router.put("/:id", controller.update);      // Update by ID
router.delete("/:id", controller.remove);   // Delete by ID

module.exports = router;
