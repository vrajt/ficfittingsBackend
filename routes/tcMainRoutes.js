// routes/tcMainRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/tcMainController");

router.get("/", controller.getAll);                        // Get all TcMain
router.get("/branch/:id", controller.getBranchById);       // Get branch by ID
router.get("/:id", controller.getById);                    // Get TcMain by ID
router.post("/", controller.create);                        // Create new
router.put("/:id", controller.update);                     // Update by ID
router.delete("/:id", controller.remove);                  // Delete by ID
router.get("/items/:id", controller.getItemByTcMainId);    // Get items by TcMain ID
//router.get("/mtcstandards", controller.getAllMtcStandards); // Get all MTC standards


module.exports = router;
