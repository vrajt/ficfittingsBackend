const express = require("express");
const router = express.Router();
const {
  createSrmMaster,
  getAllSrmMasters,
  getSrmMasterById,
  updateSrmMaster,
  deleteSrmMaster,
} = require("../controllers/srmMasterController");

// CRUD routes
router.post("/", createSrmMaster);
router.get("/", getAllSrmMasters);
router.get("/:id", getSrmMasterById);
router.put("/:id", updateSrmMaster);
router.delete("/:id", deleteSrmMaster);

module.exports = router;
