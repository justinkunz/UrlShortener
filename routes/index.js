const router = require("express").Router();
const apiRoutes = require("./api.js");
const path = require("path");
const { urlController } = require("../controllers");

// Home Page Redirect
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// API Controller
router.use("/api", apiRoutes);

// On all other calls, redirect
router.get("*", urlController.redirect);

module.exports = router;
