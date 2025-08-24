// app.js
const express = require('express');
const app = express();
const sequelize = require('./config/database');
require('dotenv').config();

app.use(express.json());

// Routes
app.use('/api/unitmaster', require('./routes/unitMasterRoutes'));
app.use('/api/uom', require('./routes/uomRoutes')); // 👈 add this
app.use('/api/customers', require('./routes/customerRoutes'));

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('✅ DB Connected'))
  .catch(err => console.error('❌ DB Connection Error:', err));

module.exports = app;
