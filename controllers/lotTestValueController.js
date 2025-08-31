const LotTestValue = require("../models/LotTestValue");

// ✅ Get all
exports.getAll = async (req, res) => {
  try {
    const records = await LotTestValue.findAll();
    res.json(records);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

// ✅ Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await LotTestValue.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: "Not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

// ✅ Create
exports.create = async (req, res) => {
  try {
    const record = await LotTestValue.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error("Error creating record:", err);
    res.status(500).json({ error: "Failed to create record" });
  }
};

// ✅ Update
exports.update = async (req, res) => {
  try {
    const record = await LotTestValue.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: "Not found" });

    await record.update(req.body);
    res.json(record);
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).json({ error: "Failed to update record" });
  }
};

// ✅ Delete
exports.delete = async (req, res) => {
  try {
    const record = await LotTestValue.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: "Not found" });

    await record.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).json({ error: "Failed to delete record" });
  }
};
