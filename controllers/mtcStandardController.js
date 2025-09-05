const MtcStandard = require("../models/MtcStandard");

// 👉 Create new record
exports.createMtcStandard = async (req, res) => {
  try {
    const standard = await MtcStandard.create(req.body);
    res.status(201).json(standard);
  } catch (error) {
    console.error("Error creating MtcStandard:", error);
    res.status(500).json({ message: "Failed to create record", error });
  }
};

// 👉 Get all records
exports.getAllMtcStandards = async (req, res) => {
  try {
    const standards = await MtcStandard.findAll();
    res.status(200).json(standards);
  } catch (error) {
    console.error("Error fetching MtcStandards:", error);
    res.status(500).json({ message: "Failed to fetch records", error });
  }
};

// 👉 Get single by ID
exports.getMtcStandardById = async (req, res) => {
  try {
    const standard = await MtcStandard.findByPk(req.params.id);
    if (!standard) return res.status(404).json({ message: "Record not found" });
    res.json(standard);
  } catch (error) {
    console.error("Error fetching record:", error);
    res.status(500).json({ message: "Failed to fetch record", error });
  }
};

// 👉 Update by ID
exports.updateMtcStandard = async (req, res) => {
  try {
    const [updated] = await MtcStandard.update(req.body, {
      where: { Id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record updated successfully" });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ message: "Failed to update record", error });
  }
};



exports.deleteMtcStandard = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete request ID:", id);

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const deleted = await MtcStandard.destroy({
      where: { Id: Number(id) },
    });

    if (deleted) {
      res.status(200).json({ message: `Record with ID ${id} deleted successfully` });
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



