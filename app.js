// app.js
const express = require('express');
const app = express();
const sequelize = require('./config/database');
require('dotenv').config();

app.use(express.json());

// Routes
app.use('/api/unitmaster', require('./routes/unitMasterRoutes'));
app.use('/api/uom', require('./routes/uomRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/productgrades', require('./routes/productGradeRoutes'));
app.use('/api/tcremarksfix', require('./routes/tcRemarksFixRoutes')); 
app.use("/api/heattestmaster", require("./routes/heatTestMasterRoutes"));
app.use("/api/laboratories", require("./routes/labMasterRoutes"));
app.use("/api/dimension-standards", require("./routes/dimStandardRoutes"));
app.use("/api/start-materials", require("./routes/srmMasterRoutes"));
app.use("/api/othertests", require("./routes/otherTestMasterRoutes"));
app.use("/api/lot-test-values", require("./routes/lotTestValueRoutes"));
app.use("/api/tcitem", require("./routes/tcItemRoutes"));
app.use("/api/tcmain", require("./routes/tcMainRoutes"));
app.use("/api/mtcstandards", require("./routes/mtcStandardRoutes"));
app.use("/api/tcheattreat", require("./routes/tcHeatTreatRoutes"));
// Test DB connection
sequelize.authenticate()
  .then(() => console.log('✅ DB Connected'))
  .catch(err => console.error('❌ DB Connection Error:', err));

module.exports = app;
