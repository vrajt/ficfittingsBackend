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
  // Use a transaction to ensure all or nothing is created
  const t = await sequelize.transaction();
  try {
    const { BranchId, items, heatTests, remarks, otherTests } = req.body;

    if (!BranchId) {
      return res.status(400).json({ message: "BranchId is required" });
    }

    // 1️⃣ Generate UserNo (6 digits)
    const lastRecord = await TcMain.findOne({
      order: [["Id", "DESC"]],
      transaction: t,
    });

    let nextNumber = 1;
    if (lastRecord) {
      nextNumber = parseInt(lastRecord.UserNo || "0") + 1;
    }

    const userNo = nextNumber.toString().padStart(6, "0"); // e.g., 000001

    // 2️⃣ Generate ApsUserNo starting with TC
    const ApsUserNo = "TC" + "2025" + userNo; // e.g., TC2025000001

    // 3️⃣ Generate ApsFullDoc based on BranchId
    let branchCode = "FIC"; // default
    if (BranchId === 1) branchCode = "NIMCO"; // example branch mapping

    const ApsFullDoc = "TC" + branchCode + "2025" + userNo; // e.g., TCNIMCO2025000001

    const now = new Date();

    // 4️⃣ Create TcMain record
    const newTcMain = await TcMain.create({
      ...req.body,
      UserNo: userNo,
      ApsUserNo,
      ApsFullDoc,
      CreatedDate: now,
      UpdateDate: now,
    }, { transaction: t });

    // 5️⃣ Create TcItem records (if any)
    if (Array.isArray(items) && items.length > 0) {
      const tcItems = items.map((item) => ({
        ...item,
        ApsFullDoc,           // link to TcMain
        CreatedDate: now,
        UpdateDate: now,
        FyFrom: item.FyFrom ? new Date(item.FyFrom) : null,
        FyTo: item.FyTo ? new Date(item.FyTo) : null,
        Po_Inv_PId: item.Po_Inv_PId || 0, // required column
      }));

      await TcItem.bulkCreate(tcItems, { transaction: t });
    }

    // 6️⃣ Create TcHeatTreatDet records using raw queries (if any)
    if (Array.isArray(heatTests) && heatTests.length > 0) {
      // Get the last ID to ensure new IDs are unique and incremental
      const lastHeatTreatDetRecord = await TcHeatTreatDet.findOne({
        order: [["Id", "DESC"]],
        raw: true,
        transaction: t,
      });
      let nextHeatTreatDetId = lastHeatTreatDetRecord ? parseInt(lastHeatTreatDetRecord.Id) + 1 : 1;
     
      for (const item of heatTests) {
        // Manually construct and execute a raw INSERT query
        const sql = `
          INSERT INTO "TcHeatTreatDet" (
            "Id", "PId", "ApsFullDoc", "HeatNo", "Heat_Code", "Heat_Desc", "CreatedDate", "UpdateDate", "TcChoice", "CreatedBy", "UpdatedBy"
          ) VALUES (
            :id, :pid, :apsFullDoc, :heatNo, :heatCode, :heatDesc, :createdDate, :updateDate, :tcChoice, :createdBy, :updatedBy
          );
        `;
        const replacements = {
          id: nextHeatTreatDetId++,
          pid: item.PId,
          apsFullDoc: ApsFullDoc,
          heatNo: item.HeatNo || "",
          heatCode: item.Heat_Code || "",
          heatDesc: item.Heat_Desc || "",
          createdDate: now,
          updateDate: now,
          tcChoice: item.TcChoice ?? false,
          createdBy: item.CreatedBy || null,
          updatedBy: item.UpdatedBy || null,
        };

        await sequelize.query(sql, {
          replacements: replacements,
          type: sequelize.QueryTypes.INSERT,
          transaction: t,
        });
      }
    }

    // 7️⃣ Create TcRemarks records using raw queries (if any)
    if (Array.isArray(remarks) && remarks.length > 0) {
      const lastRemarkRecord = await TcRemarks.findOne({
        order: [["Id", "DESC"]],
        raw: true,
        transaction: t,
      });
      let nextRemarkId = lastRemarkRecord ? parseInt(lastRemarkRecord.Id) + 1 : 1;

      for (const item of remarks) {
        const sql = `
          INSERT INTO "TcRemarks" (
            "Id", "ApsFullDoc", "PId", "TcTerms", "FyFrom", "FyTo", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdateDate", "TcChoice"
          ) VALUES (
            :id, :apsFullDoc, :pid, :tcTerms, :fyFrom, :fyTo, :createdBy, :createdDate, :updatedBy, :updateDate, :tcChoice
          );
        `;
        const replacements = {
          id: nextRemarkId++,
          apsFullDoc: ApsFullDoc,
          pid: item.PId,
          tcTerms: item.TcTerms || "",
          fyFrom: item.FyFrom ? new Date(item.FyFrom) : null,
          fyTo: item.FyTo ? new Date(item.FyTo) : null,
          createdBy: item.CreatedBy || null,
          createdDate: now,
          updatedBy: item.UpdatedBy || null,
          updateDate: now,
          tcChoice: item.TcChoice ?? false,
        };
        await sequelize.query(sql, {
          replacements: replacements,
          type: sequelize.QueryTypes.INSERT,
          transaction: t,
        });
      }
    }

    // 8️⃣ Create TcOthTestDet records using raw queries (if any)
    if (Array.isArray(otherTests) && otherTests.length > 0) {
      const lastOtherTestRecord = await TcOthTestDet.findOne({
        order: [["Id", "DESC"]],
        raw: true,
        transaction: t,
      });
      let nextOtherTestId = lastOtherTestRecord ? parseInt(lastOtherTestRecord.Id) + 1 : 1;

      for (const item of otherTests) {
        const sql = `
          INSERT INTO "TcOthTestDet" (
            "Id", "ApsFullDoc", "PId", "HeatNo", "Test_Code", "Test_Desc", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdateDate", "TcChoice", "FyFrom", "FyTo"
          ) VALUES (
            :id, :apsFullDoc, :pid, :heatNo, :testCode, :testDesc, :createdBy, :createdDate, :updatedBy, :updateDate, :tcChoice, :fyFrom, :fyTo
          );
        `;
        const replacements = {
          id: nextOtherTestId++,
          apsFullDoc: ApsFullDoc,
          pid: item.PId,
          heatNo: item.HeatNo || "",
          testCode: item.Test_Code || "",
          testDesc: item.Test_Desc || "",
          createdBy: item.CreatedBy || null,
          createdDate: now,
          updatedBy: item.UpdatedBy || null,
          updateDate: now,
          tcChoice: item.TcChoice ?? false,
          fyFrom: item.FyFrom ? new Date(item.FyFrom) : null,
          fyTo: item.FyTo ? new Date(item.FyTo) : null,
        };
        await sequelize.query(sql, {
          replacements: replacements,
          type: sequelize.QueryTypes.INSERT,
          transaction: t,
        });
      }
    }

    await t.commit(); // Commit the transaction if all operations are successful

    res.status(201).json({
      message: "TcMain and related records created successfully",
      TcMain: newTcMain,
    });
  } catch (error) {
      console.error("Error creating TcMain:", error);
      try {
        await t.rollback();
        console.log("Transaction successfully rolled back.");
      } catch (rollbackError) {
        console.error("Failed to rollback transaction:", rollbackError);
      }
      res.status(500).json({
        message: "Error creating TcMain",
        error: error.message,
      });
  }
};

// ⭐ EDIT / UPDATE (Already implemented)
// This function updates an existing record based on the ID.
exports.update = async (req, res) => {
  try {
    const data = await TcMain.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Record not found" });

    await data.update({
      ...req.body,
      UpdateDate: new Date()
    });

    res.json(data);
  } catch (error) {
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
