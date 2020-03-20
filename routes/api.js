const router = require("express").Router();
const { urlController } = require("../controllers");

router
  .route("/url")
  .post(urlController.newURL)
  .get(urlController.findAll);

module.exports = router;
