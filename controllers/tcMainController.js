const TcMain = require("../models/TcMain");
const Branch = require("../models/BranchMaster");
const TcItem = require("../models/TcItem");
const TcHeatTreatDet = require("../models/TcHeatTreatDet");
const TcRemarks = require("../models/TcRemarks");
const TcOthTestDet = require("../models/TcOthTestDet");
const sequelize = require("../config/database");

// ✅ Get All
exports.getAll = async (req, res) => {
  try {
    const data = await TcMain.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ⭐ GET BY ID (Updated to include heat, remarks, and other test details)
// This function fetches a single TcMain record and its related items and details.
exports.getById = async (req, res) => {
  try {
    // Check if ID is provided and is a valid number
    if (!req.params.id || isNaN(req.params.id)) {
      return res.status(400).json({ message: "A valid ID is required" });
    }

    const tcMain = await TcMain.findByPk(req.params.id);

    if (!tcMain) {
      return res.status(404).json({ message: "Record not found" });
    }

    // ✅ Fetch TcItems linked by ApsFullDoc
    const items = await TcItem.findAll({
      where: { ApsFullDoc: tcMain.ApsFullDoc },
    });

    // ✅ Fetch TcHeatTreatDet linked by ApsFullDoc
    const heatTreatDetails = await TcHeatTreatDet.findAll({
      where: { ApsFullDoc: tcMain.ApsFullDoc },
    });

    // ✅ Fetch TcRemarks linked by ApsFullDoc
    const remarks = await TcRemarks.findAll({
      where: { ApsFullDoc: tcMain.ApsFullDoc },
    });

    // ✅ Fetch TcOthTestDet linked by ApsFullDoc
    const otherTestDetails = await TcOthTestDet.findAll({
      where: { ApsFullDoc: tcMain.ApsFullDoc },
    });

    // ✅ Combine TcMain, Items, HeatTreatDetails, Remarks, and OtherTestDetails
    res.json({
      ...tcMain.toJSON(),
      items,
      heatTreatDetails,
      remarks,
      otherTestDetails,
    });

  } catch (error) {
    console.error("Error fetching TcMain with all details:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create (auto set CreatedDate & UpdateDate)
exports.create = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { BranchId, items, heatTests, remarks, otherTests } = req.body;

    if (!BranchId) {
      return res.status(400).json({ message: "BranchId is required" });
    }

    // 1️⃣ Generate UserNo & ApsFullDoc
    const lastRecord = await TcMain.findOne({ order: [["Id", "DESC"]], transaction: t });
    const nextNumber = lastRecord ? parseInt(lastRecord.UserNo || "0") + 1 : 1;
    const userNo = nextNumber.toString().padStart(6, "0");
    const ApsUserNo = "TC" + "2025" + userNo;
    const branchCode = BranchId === 1 ? "NIMCO" : "FIC";
    const ApsFullDoc = "TC" + branchCode + "2025" + userNo;
    const now = new Date();

    // 2️⃣ Create TcMain
    const newTcMain = await TcMain.create({
      ...req.body,
      UserNo: userNo,
      ApsUserNo,
      ApsFullDoc,
      CreatedDate: now,
      UpdateDate: now,
    }, { transaction: t });

    // 3️⃣ Create TcItem records (ensure PId assigned)
    if (Array.isArray(items) && items.length > 0) {
      const lastItem = await TcItem.findOne({ order: [["PId", "DESC"]], raw: true, transaction: t });
      let nextPId = lastItem ? parseInt(lastItem.PId) + 1 : 1;

      const tcItems = items.map(item => ({
        ...item,
        PId: nextPId++,           // Assign unique PId
        ApsFullDoc,
        CreatedDate: now,
        UpdateDate: now,
        FyFrom: item.FyFrom ? new Date(item.FyFrom) : null,
        FyTo: item.FyTo ? new Date(item.FyTo) : null,
        Po_Inv_PId: item.Po_Inv_PId || 0,
      }));

      await TcItem.bulkCreate(tcItems, { transaction: t });
    }

    // 4️⃣ Create TcHeatTreatDet records
    if (Array.isArray(heatTests) && heatTests.length > 0) {
      const lastHeat = await TcHeatTreatDet.findOne({ order: [["Id", "DESC"]], raw: true, transaction: t });
      let nextHeatId = lastHeat ? parseInt(lastHeat.Id) + 1 : 1;

      for (const h of heatTests) {
        await TcHeatTreatDet.create({
          Id: nextHeatId++,
          PId: h.PId || nextHeatId, // Ensure PId not null
          ApsFullDoc,
          HeatNo: h.HeatNo || "",
          Heat_Code: h.Heat_Code || "",
          Heat_Desc: h.Heat_Desc || "",
          CreatedDate: now,
          UpdateDate: now,
          TcChoice: h.TcChoice ?? false,
          CreatedBy: h.CreatedBy || null,
          UpdatedBy: h.UpdatedBy || null,
        }, { transaction: t });
      }
    }

    // 5️⃣ TcRemarks
    if (Array.isArray(remarks) && remarks.length > 0) {
      const lastRemark = await TcRemarks.findOne({ order: [["Id", "DESC"]], raw: true, transaction: t });
      let nextRemarkId = lastRemark ? parseInt(lastRemark.Id) + 1 : 1;

      for (const r of remarks) {
        await TcRemarks.create({
          Id: nextRemarkId++,
          PId: r.PId || nextRemarkId,
          ApsFullDoc,
          TcTerms: r.TcTerms || "",
          FyFrom: r.FyFrom ? new Date(r.FyFrom) : null,
          FyTo: r.FyTo ? new Date(r.FyTo) : null,
          CreatedDate: now,
          UpdateDate: now,
          TcChoice: r.TcChoice ?? false,
          CreatedBy: r.CreatedBy || null,
          UpdatedBy: r.UpdatedBy || null,
        }, { transaction: t });
      }
    }

    // 6️⃣ TcOthTestDet
    if (Array.isArray(otherTests) && otherTests.length > 0) {
      const lastOther = await TcOthTestDet.findOne({ order: [["Id", "DESC"]], raw: true, transaction: t });
      let nextOtherId = lastOther ? parseInt(lastOther.Id) + 1 : 1;

      for (const o of otherTests) {
        await TcOthTestDet.create({
          Id: nextOtherId++,
          PId: o.PId || nextOtherId,
          ApsFullDoc,
          HeatNo: o.HeatNo || "",
          Test_Code: o.Test_Code || "",
          Test_Desc: o.Test_Desc || "",
          FyFrom: o.FyFrom ? new Date(o.FyFrom) : null,
          FyTo: o.FyTo ? new Date(o.FyTo) : null,
          CreatedDate: now,
          UpdateDate: now,
          TcChoice: o.TcChoice ?? false,
          CreatedBy: o.CreatedBy || null,
          UpdatedBy: o.UpdatedBy || null,
        }, { transaction: t });
      }
    }

    await t.commit();
    res.status(201).json({ message: "TcMain and related records created successfully", TcMain: newTcMain });
  } catch (error) {
    console.error("Error creating TcMain:", error.message);
    await t.rollback();
    res.status(500).json({ message: "Error creating TcMain", error: error.message });
  }
};

// ⭐ EDIT / UPDATE (Already implemented)
// This function updates an existing record based on the ID.
exports.update = async (req, res) => {
  console.log('Incoming Request Body:', JSON.stringify(req.body, null, 2));

  const t = await sequelize.transaction();

  try {
    const { tcMainData, itemsData, heatTests, otherTests, remarksData } = req.body;
    const documentId = req.params.id;

    const mainDocument = await TcMain.findByPk(documentId, { transaction: t });
    if (!mainDocument) {
      await t.rollback();
      return res.status(404).json({ message: "Main record not found" });
    }

    const { ApsFullDoc } = tcMainData;
    if (!ApsFullDoc) {
      await t.rollback();
      return res.status(400).json({ message: "ApsFullDoc is required" });
    }

    // Update main document
    await mainDocument.update({ ...tcMainData, UpdateDate: new Date() }, { transaction: t });
    console.log('Main document updated successfully.');

    const manageChildRecords = async (model, data, primaryKey, foreignKey, defaultsFn = null) => {
      if (!Array.isArray(data)) return;

      const existingRecords = await model.findAll({ where: { [foreignKey]: ApsFullDoc }, transaction: t });
      const existingIds = existingRecords.map(r => r[primaryKey]?.toString());

      // Find max existing Id for non-identity tables
      let lastRecord = await model.findOne({ order: [[primaryKey, 'DESC']], raw: true, transaction: t });
      let nextId = lastRecord ? parseInt(lastRecord[primaryKey]) + 1 : 1;

      for (const item of data) {
        // Ensure foreign key
        if (!item[foreignKey] || item[foreignKey] === '') item[foreignKey] = ApsFullDoc;

        const itemId = item[primaryKey]?.toString();

        if (!itemId || !existingIds.includes(itemId)) {
          const payload = {
            ...item,
            [primaryKey]: itemId || nextId++,
            CreatedDate: new Date(),
            UpdateDate: new Date(),
            ...(defaultsFn ? defaultsFn(item) : {})
          };
          await model.create(payload, { transaction: t });
          console.log(`Inserted new ${model.name} with Id ${payload[primaryKey]}`);
        } else {
          await model.update(
            { ...item, UpdateDate: new Date() },
            { where: { [primaryKey]: item[primaryKey] }, transaction: t }
          );
          console.log(`Updated ${model.name} with Id ${itemId}`);
        }
      }
    };

    await manageChildRecords(TcItem, itemsData, 'Id', 'ApsFullDoc', item => ({
      PId: item.PId || 0,
      Po_Inv_PId: item.Po_Inv_PId || 0
    }));

    await manageChildRecords(TcHeatTreatDet, heatTests, 'Id', 'ApsFullDoc', item => ({
      PId: item.PId || 0,
      ApsFullDoc: ApsFullDoc
    }));

    await manageChildRecords(TcOthTestDet, otherTests, 'Id', 'ApsFullDoc', item => ({
      PId: item.PId || 0,
      ApsFullDoc: ApsFullDoc
    }));

    await manageChildRecords(TcRemarks, remarksData, 'Id', 'ApsFullDoc');

    await t.commit();
    console.log('Transaction committed successfully.');
    res.json({ message: "Document and related records updated successfully" });

  } catch (error) {
    console.error("Error during multi-table update:", error.message);
    try {
      await t.rollback();
      console.log("Transaction rolled back successfully");
    } catch (rollbackError) {
      console.error("Rollback failed:", rollbackError.message);
    }
    res.status(500).json({ error: error.message });
  }
};



















// ✅ Delete
exports.remove = async (req, res) => {
  try {
    const data = await TcMain.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Record not found" });

    await data.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBranchById = async (req, res) => {
  try {
    const data = await TcMain.findByPk(req.params.id, {
      include: [{ model: Branch, as: "branch" }]
    });
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItemByTcMainId = async (req, res) => {
  try {
    const tcMainId = req.params.id;

    const items = await TcItem.findAll({
      where: { PId: tcMainId } // Assuming PId in TcItem references TcMain's ID
    });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No TcItems found for this TcMain ID" });
    }

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMtcStandards = async (req, res) => {
  try {
    const standards = await MtcStandard.findAll();
    console.log('standards::: ', standards);
    res.status(200).json(standards);
  } catch (error) {
    console.error("Error fetching MtcStandard records:", error);
    res.status(500).json({ message: "Failed to fetch MtcStandard records", error });
  }
};
