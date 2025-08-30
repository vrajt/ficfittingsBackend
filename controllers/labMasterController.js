const LabMaster = require("../models/LabMaster");

// ✅ Get all labs
async function getAllLabs(req, res) {
  try {
    const labs = await LabMaster.findAll();
    res.json(labs);
  } catch (error) {
    console.error("Error fetching labs:", error);
    res.status(500).json({ message: "Error fetching labs", error: error.message });
  }
}

// ✅ Create new lab
async function createLab(req, res) {
  try {
    const newLab = await LabMaster.create({
      ...req.body,
      CreatedDate: new Date() // store as datetime2
    });
    res.status(201).json(newLab);
  } catch (error) {
    console.error("Error creating lab:", error);
    res.status(500).json({ message: "Error creating lab", error: error.message });
  }
}

// ✅ Update lab
async function updateLab(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await LabMaster.update(
      { ...req.body, UpdateDate: new Date() }, // auto-set datetime2
      { where: { Id: id } }
    );

    if (updated) {
      const updatedLab = await LabMaster.findByPk(id);
      res.json(updatedLab);
    } else {
      res.status(404).json({ message: "Lab not found" });
    }
  } catch (error) {
    console.error("Error updating lab:", error);
    res.status(500).json({ message: "Error updating lab", error: error.message });
  }
}

// ✅ Delete lab
async function deleteLab(req, res) {
  try {
    const { id } = req.params;
    const deleted = await LabMaster.destroy({ where: { Id: id } });

    if (deleted) {
      res.json({ message: "Lab deleted successfully" });
    } else {
      res.status(404).json({ message: "Lab not found" });
    }
  } catch (error) {
    console.error("Error deleting lab:", error);
    res.status(500).json({ message: "Error deleting lab", error: error.message });
  }
}

module.exports = { getAllLabs, createLab, updateLab, deleteLab };
