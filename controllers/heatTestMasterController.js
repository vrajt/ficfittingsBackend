const HeatTestMaster = require("../models/HeatTestMaster");

// Get all records
async function getAllHeatTests(req, res) {
  try {
    const records = await HeatTestMaster.findAll();
    res.json(records);
  } catch (error) {
    console.error("Error fetching HeatTestMaster:", error);
    res.status(500).json({ message: "Error fetching HeatTestMaster", error: error.message });
  }
}

// Get by Id
async function getHeatTestById(req, res) {
  try {
    const record = await HeatTestMaster.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(record);
  } catch (error) {
    console.error("Error fetching HeatTestMaster:", error);
    res.status(500).json({ message: "Error fetching HeatTestMaster", error: error.message });
  }
}

// Create new record
async function createHeatTest(req, res) {
  try {
    const newRecord = await HeatTestMaster.create({
      ...req.body,
      CreatedDate: new Date()
    });
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("Error creating HeatTestMaster:", error);
    res.status(500).json({ message: "Error creating HeatTestMaster", error: error.message });
  }
}

// Update record
async function updateHeatTest(req, res) {
  try {
    const record = await HeatTestMaster.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    await record.update({
      ...req.body,
      UpdateDate: new Date()
    });
    res.json(record);
  } catch (error) {
    console.error("Error updating HeatTestMaster:", error);
    res.status(500).json({ message: "Error updating HeatTestMaster", error: error.message });
  }
}

// Delete record
async function deleteHeatTest(req, res) {
  try {
    const record = await HeatTestMaster.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    await record.destroy();
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting HeatTestMaster:", error);
    res.status(500).json({ message: "Error deleting HeatTestMaster", error: error.message });
  }
}

module.exports = {
  getAllHeatTests,
  getHeatTestById,
  createHeatTest,
  updateHeatTest,
  deleteHeatTest
};
