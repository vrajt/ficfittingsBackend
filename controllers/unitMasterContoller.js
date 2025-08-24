const UnitMaster = require('../models/UnitMaster');
const UOMMaster = require('../models/UOMMaster');


async function getAll(req, res) {
  console.log('⚡ Debug: Incoming request to getAll');
  console.log('Headers:', req.headers);
  console.log('Query Params:', req.query);
  console.log('Route Params:', req.params);
  console.log('Body:', req.body);

  try {
    const units = await UnitMaster.findAll({ limit: 100 });
    console.log('units::: ', units);
    console.log(`✅ Found ${units.length} units`);
    res.status(200).json(units);
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  }
}



// Get a unit by ID0
async function getById(req, res) {
  try {
    const unit = await UnitMaster.findByPk(req.params.id);
    if (!unit) return res.status(404).json({ message: 'Unit not found' });
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching unit', error });
  }
}

// Create a new unit
async function create(req, res) {
  try {
    const newUnit = await UnitMaster.create(req.body);
    res.status(201).json(newUnit);
  } catch (error) {
    res.status(500).json({ message: 'Error creating unit', error });
  }
}

// Update an existing unit
async function update(req, res) {
  try {
    const unit = await UnitMaster.findByPk(req.params.id);
    if (!unit) return res.status(404).json({ message: 'Unit not found' });

    await unit.update(req.body);
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ message: 'Error updating unit', error });
  }
}

// Delete a unit
async function remove(req, res) {
  try {
    const unit = await UnitMaster.findByPk(req.params.id);
    if (!unit) return res.status(404).json({ message: 'Unit not found' });

    await unit.destroy();
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting unit', error });
  }
}
async function getAllUOM(req, res) {
  console.log('req::: ', req);
  try {
    const uoms = await UOMMaster.find({}, { UOM: 1, _id: 0 });
    res.status(200).json(uoms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching UOMs", error: error.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getAllUOM,
};
