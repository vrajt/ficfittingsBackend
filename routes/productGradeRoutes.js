const express = require("express");
const router = express.Router();
const productGradeController = require("../controllers/productGradeController");

router.post("/", productGradeController.createProductGrade);
router.get("/", productGradeController.getAllProductGrades);
router.get("/:id", productGradeController.getProductGradeById);
router.put("/:id", productGradeController.updateProductGrade);
router.delete("/:id", productGradeController.deleteProductGrade);

module.exports = router;
