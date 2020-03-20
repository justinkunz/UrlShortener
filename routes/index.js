const router = require("express").Router();
const apiRoutes = require("./api.js");
const path = require("path");
const { urlController } = require("../controllers");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.use("/api", apiRoutes);

router.get("*", urlController.redirect);

module.exports = router;
