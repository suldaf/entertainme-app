const router = require("express").Router();
const Controller = require("../controllers/Controller");

router.get("/", Controller.find);
router.get("/:id", Controller.findById);

router.post("/", Controller.create);

router.put("/:id", Controller.update);

router.delete("/:id", Controller.remove);

module.exports = router;
