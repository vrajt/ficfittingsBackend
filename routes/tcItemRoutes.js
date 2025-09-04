const express = require("express");
const router = express.Router();
const tcItemController = require("../controllers/tcItemController");

router.get("/", tcItemController.getAllTcItems);
router.get("/doc/:ApsFullDoc", tcItemController.getTcItemsByDoc);
router.post("/", tcItemController.createTcItem);
router.put("/:id", tcItemController.updateTcItem);
router.delete("/:id", tcItemController.deleteTcItem);


module.exports = router;
