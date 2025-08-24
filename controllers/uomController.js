const UOMMaster = require('../models/UOMMaster');

async function getAllUOM(req, res) {
  try {
    const uoms = await UOMMaster.findAll({
      attributes: ['UOM']
    });
    res.status(200).json(uoms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching UOMs', error: error.message });
  }
}

module.exports = { getAllUOM };
