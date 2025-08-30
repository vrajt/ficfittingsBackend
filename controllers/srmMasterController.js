const SrmMaster = require("../models/SrmMaster");

// Create
const createSrmMaster = async (req, res) => {
  try {
    const record = await SrmMaster.create({
      ...req.body,
      CreatedDate: new Date(),
    });

    // update SrmId = Id after creation
    record.SrmId = record.Id;
    await record.save();

    res.status(201).json(record);
  } catch (error) {
    console.error("Error creating SrmMaster:", error);
    res.status(500).json({ message: "Error creating SrmMaster", error: error.message });
  }
};

// Read All
const getAllSrmMasters = async (req, res) => {
  try {
    const records = await SrmMaster.findAll();
    res.json(records);
  } catch (error) {
    console.error("Error fetching SrmMasters:", error);
    res.status(500).json({ message: "Error fetching SrmMasters", error: error.message });
  }
};

// Read One
const getSrmMasterById = async (req, res) => {
  try {
    const record = await SrmMaster.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "SrmMaster not found" });
    res.json(record);
  } catch (error) {
    console.error("Error fetching SrmMaster:", error);
    res.status(500).json({ message: "Error fetching SrmMaster", error: error.message });
  }
};

// Update
const updateSrmMaster = async (req, res) => {
  try {
    const record = await SrmMaster.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "SrmMaster not found" });

    await record.update({
      ...req.body,
      UpdateDate: new Date(),
    });

    // keep SrmId same as Id
    record.SrmId = record.Id;
    await record.save();

    res.json(record);
  } catch (error) {
    console.error("Error updating SrmMaster:", error);
    res.status(500).json({ message: "Error updating SrmMaster", error: error.message });
  }
};

// Delete
const deleteSrmMaster = async (req, res) => {
  try {
    const record = await SrmMaster.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "SrmMaster not found" });

    await record.destroy();
    res.json({ message: "SrmMaster deleted successfully" });
  } catch (error) {
    console.error("Error deleting SrmMaster:", error);
    res.status(500).json({ message: "Error deleting SrmMaster", error: error.message });
  }
};

module.exports = {
  createSrmMaster,
  getAllSrmMasters,
  getSrmMasterById,
  updateSrmMaster,
  deleteSrmMaster,
};
