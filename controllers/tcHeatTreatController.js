const TcHeatTreatDet = require("../models/TcHeatTreatDet");

// ✅ Get all
exports.getAll = async (req, res) => {
  try {
    const data = await TcHeatTreatDet.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get by ID
exports.getById = async (req, res) => {
  try {
    const data = await TcHeatTreatDet.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Record not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create
exports.create = async (req, res) => {
  try {
    const now = new Date();
    const newRecord = await TcHeatTreatDet.create({
      ...req.body,
      CreatedDate: now,
      UpdateDate: now,
    });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update
exports.update = async (req, res) => {
  try {
    const record = await TcHeatTreatDet.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    await record.update({
      ...req.body,
      UpdateDate: new Date(),
    });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete
exports.remove = async (req, res) => {
  try {
    const record = await TcHeatTreatDet.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    await record.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
