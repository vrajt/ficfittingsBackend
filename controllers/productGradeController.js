const ProductGrade = require("../models/ProductGrade");

// Create
async function createProductGrade(req, res) {
  try {
    const productGrade = await ProductGrade.create(req.body);
    res.status(201).json(productGrade);
  } catch (error) {
    console.error("Error creating ProductGrade:", error);
    res.status(500).json({ message: "Error creating ProductGrade", error: error.message });
  }
}

// Read all
async function getAllProductGrades(req, res) {
  try {
    const productGrades = await ProductGrade.findAll();
    
    res.json(productGrades);
  } catch (error) {
    console.error("Error fetching ProductGrades:", error);
    res.status(500).json({ message: "Error fetching ProductGrades", error: error.message });
  }
}

// Read one
async function getProductGradeById(req, res) {
  try {
    const { id } = req.params;
    const productGrade = await ProductGrade.findByPk(id);
    if (!productGrade) {
      return res.status(404).json({ message: "ProductGrade not found" });
    }
    res.json(productGrade);
  } catch (error) {
    console.error("Error fetching ProductGrade:", error);
    res.status(500).json({ message: "Error fetching ProductGrade", error: error.message });
  }
}

// Update
async function updateProductGrade(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await ProductGrade.update(req.body, { where: { Id: id } });

    if (updated === 0) {
      return res.status(404).json({ message: "ProductGrade not found or no changes made" });
    }

    const updatedProductGrade = await ProductGrade.findByPk(id);
    res.json(updatedProductGrade);
  } catch (error) {
    console.error("Error updating ProductGrade:", error);
    res.status(500).json({ message: "Error updating ProductGrade", error: error.message });
  }
}

// Delete
async function deleteProductGrade(req, res) {
  try {
    const { id } = req.params;
    const deleted = await ProductGrade.destroy({ where: { Id: id } });

    if (deleted === 0) {
      return res.status(404).json({ message: "ProductGrade not found" });
    }

    res.json({ message: "ProductGrade deleted successfully" });
  } catch (error) {
    console.error("Error deleting ProductGrade:", error);
    res.status(500).json({ message: "Error deleting ProductGrade", error: error.message });
  }
}

module.exports = {
  createProductGrade,
  getAllProductGrades,
  getProductGradeById,
  updateProductGrade,
  deleteProductGrade,
};
