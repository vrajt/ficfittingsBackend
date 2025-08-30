const TcRemarksFix = require("../models/TcRemarksFix");

// ✅ Create
async function createTcRemarksFix(req, res) {
  try {
    const newRecord = await TcRemarksFix.create({
      ...req.body,
      CreatedDate: new Date(), // auto set created date
    });
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("Error creating TcRemarksFix:", error);
    res.status(500).json({ message: "Error creating TcRemarksFix", error: error.message });
  }
}

// ✅ Read all
async function getAllTcRemarksFix(req, res) {
  try {
    const records = await TcRemarksFix.findAll();
    res.json(records);
  } catch (error) {
    console.error("Error fetching TcRemarksFix records:", error);
    res.status(500).json({ message: "Error fetching TcRemarksFix", error: error.message });
  }
}

// ✅ Read by Id
async function getTcRemarksFixById(req, res) {
  try {
    const { id } = req.params;
    const record = await TcRemarksFix.findByPk(id);

    if (!record) {
      return res.status(404).json({ message: "TcRemarksFix not found" });
    }

    res.json(record);
  } catch (error) {
    console.error("Error fetching TcRemarksFix:", error);
    res.status(500).json({ message: "Error fetching TcRemarksFix", error: error.message });
  }
}

// ✅ Update
async function updateTcRemarksFix(req, res) {
  try {
    const { id } = req.params;

    const [updated] = await TcRemarksFix.update(
      { ...req.body, UpdateDate: new Date() }, // auto set updated date
      { where: { Id: id } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "TcRemarksFix not found or no changes made" });
    }

    const updatedRecord = await TcRemarksFix.findByPk(id);
    res.json(updatedRecord);
  } catch (error) {
    console.error("Error updating TcRemarksFix:", error);
    res.status(500).json({ message: "Error updating TcRemarksFix", error: error.message });
  }
}

// ✅ Delete
async function deleteTcRemarksFix(req, res) {
  try {
    const { id } = req.params;
    const deleted = await TcRemarksFix.destroy({ where: { Id: id } });

    if (deleted === 0) {
      return res.status(404).json({ message: "TcRemarksFix not found" });
    }

    res.json({ message: "TcRemarksFix deleted successfully" });
  } catch (error) {
    console.error("Error deleting TcRemarksFix:", error);
    res.status(500).json({ message: "Error deleting TcRemarksFix", error: error.message });
  }
}

module.exports = {
  createTcRemarksFix,
  getAllTcRemarksFix,
  getTcRemarksFixById,
  updateTcRemarksFix,
  deleteTcRemarksFix,
};
