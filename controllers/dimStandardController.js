const DimStandard = require("../models/DimStandard");

// ✅ Create
const createDimStandard = async (req, res) => {
  try {
    const dimStandard = await DimStandard.create({
      ...req.body,
      CreatedDate: new Date(),   // auto set on create
    });
    res.status(201).json(dimStandard);
  } catch (error) {
    console.error("Error creating DimStandard:", error);
    res.status(500).json({ message: "Error creating DimStandard", error: error.message });
  }
};

// ✅ Read All
const getAllDimStandards = async (req, res) => {
  try {
    const dimStandards = await DimStandard.findAll();
    res.json(dimStandards);
  } catch (error) {
    console.error("Error fetching DimStandards:", error);
    res.status(500).json({ message: "Error fetching DimStandards", error: error.message });
  }
};

// ✅ Read One
const getDimStandardById = async (req, res) => {
  try {
    const dimStandard = await DimStandard.findByPk(req.params.id);
    if (!dimStandard) {
      return res.status(404).json({ message: "DimStandard not found" });
    }
    res.json(dimStandard);
  } catch (error) {
    console.error("Error fetching DimStandard:", error);
    res.status(500).json({ message: "Error fetching DimStandard", error: error.message });
  }
};

// ✅ Update
const updateDimStandard = async (req, res) => {
  try {
    const dimStandard = await DimStandard.findByPk(req.params.id);
    if (!dimStandard) {
      return res.status(404).json({ message: "DimStandard not found" });
    }

    await dimStandard.update({
      ...req.body,
      UpdateDate: new Date(),   // auto set on update
    });

    res.json(dimStandard);
  } catch (error) {
    console.error("Error updating DimStandard:", error);
    res.status(500).json({ message: "Error updating DimStandard", error: error.message });
  }
};

// ✅ Delete
const deleteDimStandard = async (req, res) => {
  try {
    const dimStandard = await DimStandard.findByPk(req.params.id);
    if (!dimStandard) {
      return res.status(404).json({ message: "DimStandard not found" });
    }
    await dimStandard.destroy();
    res.json({ message: "DimStandard deleted successfully" });
  } catch (error) {
    console.error("Error deleting DimStandard:", error);
    res.status(500).json({ message: "Error deleting DimStandard", error: error.message });
  }
};

module.exports = {
  createDimStandard,
  getAllDimStandards,
  getDimStandardById,
  updateDimStandard,
  deleteDimStandard,
};
