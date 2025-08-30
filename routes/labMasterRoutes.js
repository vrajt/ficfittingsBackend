const express = require("express");
const router = express.Router();
const {
  getAllLabs,
  createLab,
  updateLab,
  deleteLab
} = require("../controllers/labMasterController");

// GET all
router.get("/", getAllLabs);

// CREATE new
router.post("/", createLab);

// UPDATE by id
router.put("/:id", updateLab);

// DELETE by id
router.delete("/:id", deleteLab);

module.exports = router;
