const express = require("express");
const router = express.Router();
const controller = require("../controllers/otherTestMasterController");

router.get("/", controller.getAllOtherTests);
router.get("/:id", controller.getOtherTestById);
router.post("/", controller.createOtherTest);
router.put("/:id", controller.updateOtherTest);
router.delete("/:id", controller.deleteOtherTest);

module.exports = router;
