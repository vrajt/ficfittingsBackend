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
    console.log('req.body::: ', req.body);

    if (!BranchId) {
      return res.status(400).json({ message: "BranchId is required" });
    }

    // 1️⃣ Generate UserNo & ApsFullDoc
const lastRecord = await TcMain.findOne({ order: [["Id", "DESC"]], transaction: t });
const nextNumber = lastRecord ? parseInt(lastRecord.UserNo || "0") + 1 : 1;
const userNo = nextNumber.toString().padStart(4, "0");

const now = new Date();
const branchCode = BranchId === 1 ? "NIMC" : "FIC";

// ✅ Determine financial year in short form (e.g., 25-26)
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const fyStartYear = currentMonth >= 4 ? currentYear : currentYear - 1;
const fyShortStart = fyStartYear.toString().slice(-2);
const fyShortEnd = (fyStartYear + 1).toString().slice(-2);
const financialYear = `${fyShortStart}-${fyShortEnd}`;

// ✅ Format: FICMTC/000001/25-26 or NIMCOMTC/000001/25-26
const ApsUserNo = `${branchCode}/MTC/${userNo}/${financialYear}`;
const ApsFullDoc = `${branchCode}/MTC/${userNo}/${financialYear}`;

const nowDate = new Date();




    // 2️⃣ Create TcMain
    const newTcMain = await TcMain.create({
      ...req.body,
      UserNo: userNo,
      ApsUserNo,
      ApsFullDoc,
      CreatedDate: now,
      UpdateDate: now,
    }, { transaction: t });

    // 3️⃣ Create TcItem records (PId = 1..n per ApsFullDoc; ignore _tempId)
    if (Array.isArray(items) && items.length > 0) {
      const lastItem = await TcItem.findOne({ order: [["Id", "DESC"]], raw: true, transaction: t });
      let nextId = lastItem ? parseInt(lastItem.Id) + 1 : 1001;

      let nextPId = 1; // per certificate

      const tcItems = items.map((it) => {
        const {
          ProductName,
          Specification,
          HeatNo,
          Qty1,
          Qty1Unit,
          Po_Inv_PId,
          FyFrom,
          FyTo,
          // explicitly drop _tempId and any unknown props
        } = it;

        return {
          Id: nextId++,
          PId: nextPId++,
          ApsFullDoc,
          ProductName: ProductName || "",
          Specification: Specification || "",
          HeatNo: HeatNo || "",
          Qty1: Qty1 ?? 0,
          Qty1Unit: Qty1Unit || "",
          Po_Inv_PId: Po_Inv_PId || 0,
          FyFrom: FyFrom ? new Date(FyFrom) : null,
          FyTo: FyTo ? new Date(FyTo) : null,
          CreatedDate: now,
          UpdateDate: now,
        };
      });

      await TcItem.bulkCreate(tcItems, { transaction: t });
    }

    // 4️⃣ TcHeatTreatDet (PId = 1..n per certificate; ignore _tempId)
    if (Array.isArray(heatTests) && heatTests.length > 0) {
      const lastHeat = await TcHeatTreatDet.findOne({ order: [["Id", "DESC"]], raw: true, transaction: t });
      let nextHeatId = lastHeat ? parseInt(lastHeat.Id) + 1 : 1;
      let nextHeatPId = 1;

      for (const h of heatTests) {
        await TcHeatTreatDet.create({
          Id: nextHeatId++,
          PId: nextHeatPId++,
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

    // 5️⃣ TcRemarks (keep given PId, but ignore _tempId)
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

    // 6️⃣ TcOthTestDet (PId = 1..n per certificate; ignore _tempId)
    if (Array.isArray(otherTests) && otherTests.length > 0) {
      const lastOther = await TcOthTestDet.findOne({ order: [["Id", "DESC"]], raw: true, transaction: t });
      let nextOtherId = lastOther ? parseInt(lastOther.Id) + 1 : 1;
      let nextOtherPId = 1;

      for (const o of otherTests) {
        await TcOthTestDet.create({
          Id: nextOtherId++,
          PId: nextOtherPId++,
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
  console.log('req::: ', req.body);

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


 const manageChildRecords = async (model, data, primaryKey, foreignKey, defaultsFn = null) => {
  if (!Array.isArray(data)) return;

  // Existing records in DB
  const existingRecords = await model.findAll({ where: { [foreignKey]: ApsFullDoc }, transaction: t });
  const existingIds = existingRecords.map(r => r[primaryKey]?.toString());

  // Incoming Ids from request
  const incomingIds = data.map(d => d[primaryKey]?.toString()).filter(Boolean);

  // Find max existing Id for non-identity tables
  let lastRecord = await model.findOne({ order: [[primaryKey, 'DESC']], raw: true, transaction: t });
  let nextId = lastRecord ? parseInt(lastRecord[primaryKey]) + 1 : 1;

  // 🔹 Insert / Update
  for (const item of data) {
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
     
    } else {
      await model.update(
        { ...item, UpdateDate: new Date() },
        { where: { [primaryKey]: item[primaryKey] }, transaction: t }
      );
     
    }
  }

  // 🔹 Delete missing ones
  const toDelete = existingIds.filter(id => !incomingIds.includes(id));
  if (toDelete.length > 0) {
    await model.destroy({ where: { [primaryKey]: toDelete }, transaction: t });
    
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
    
    res.json({ message: "Document and related records updated successfully" });

  } catch (error) {
    console.error("Error during multi-table update:", error.message);
    try {
      await t.rollback();
      
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
 
    res.status(200).json(standards);
  } catch (error) {
    console.error("Error fetching MtcStandard records:", error);
    res.status(500).json({ message: "Failed to fetch MtcStandard records", error });
  }
};
