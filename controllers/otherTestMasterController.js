const OtherTestMaster = require("../models/OtherTestMaster");

// ✅ Get all
exports.getAllOtherTests = async (req, res) => {
  try {
    const tests = await OtherTestMaster.findAll();
    res.json(tests);
  } catch (err) {
    console.error("Error fetching OtherTestMasters:", err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

// ✅ Get by ID
exports.getOtherTestById = async (req, res) => {
  try {
    const test = await OtherTestMaster.findByPk(req.params.id);
    if (!test) return res.status(404).json({ error: "Not found" });
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

// ✅ Create
exports.createOtherTest = async (req, res) => {
  try {
    const test = await OtherTestMaster.create({
      ...req.body,
      CreatedDate: new Date(),   // <-- set created date
    });
    res.status(201).json(test);
  } catch (err) {
    console.error("Error creating OtherTestMaster:", err);
    res.status(500).json({ error: "Failed to create record" });
  }
};

// ✅ Update
exports.updateOtherTest = async (req, res) => {
  try {
    const test = await OtherTestMaster.findByPk(req.params.id);
    if (!test) return res.status(404).json({ error: "Not found" });

    await test.update({
      ...req.body,
      UpdateDate: new Date(),   // <-- set updated date
    });
    res.json(test);
  } catch (err) {
    console.error("Error updating OtherTestMaster:", err);
    res.status(500).json({ error: "Failed to update record" });
  }
};

// ✅ Delete
exports.deleteOtherTest = async (req, res) => {
  try {
    const test = await OtherTestMaster.findByPk(req.params.id);
    if (!test) return res.status(404).json({ error: "Not found" });

    await test.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting OtherTestMaster:", err);
    res.status(500).json({ error: "Failed to delete record" });
  }
};
