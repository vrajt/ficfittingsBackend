const CustomerMaster = require('../models/CustomerMaster');

// CREATE
async function createCustomer(req, res) {
  console.log('req::: ', req.body);
  try {
    const customer = await CustomerMaster.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error: error.message });
    console.error(error.message)
  }
}

// READ (ALL)
async function getAllCustomers(req, res) {
  try {
    const customers = await CustomerMaster.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
}

// READ (ONE)
async function getCustomerById(req, res) {
  try {
    const { id } = req.params;
    const customer = await CustomerMaster.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error: error.message });
  }
}

// UPDATE
async function updateCustomer(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await CustomerMaster.update(req.body, {
      where: { Id: id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    const updatedCustomer = await CustomerMaster.findByPk(id);
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
}

// DELETE
async function deleteCustomer(req, res) {
  try {
    const { id } = req.params;
    const deleted = await CustomerMaster.destroy({
      where: { Id: id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
}

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
};
