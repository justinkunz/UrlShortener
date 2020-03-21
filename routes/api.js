const router = require("express").Router();
const { urlController } = require("../controllers");

router
  .route("/url")
  .post(urlController.newURL) // Adding new URL to db
  .get(urlController.findAll); // Pulling all db results

module.exports = router;
