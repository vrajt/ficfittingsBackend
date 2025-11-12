const TcItem = require("../models/TcItem");

// ✅ Get all items
exports.getAllTcItems = async (req, res) => {
  try {
    const items = await TcItem.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get by ApsFullDoc
exports.getTcItemsByDoc = async (req, res) => {
  try {
    const items = await TcItem.findAll({
      where: { ApsFullDoc: req.params.ApsFullDoc }
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Create
exports.createTcItem = async (req, res) => {
  try {
    const item = await TcItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update (by Id)
exports.updateTcItem = async (req, res) => {
  console.log('req::: ', req.body);
  try {
    const item = await TcItem.findOne({ where: { Id: req.params.id } });
    if (!item) return res.status(404).json({ message: "Not found" });

    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete (by Id)
exports.deleteTcItem = async (req, res) => {
  try {
    const item = await TcItem.findOne({ where: { Id: req.params.id } });
    if (!item) return res.status(404).json({ message: "Not found" });

    await item.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
