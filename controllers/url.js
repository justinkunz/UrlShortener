const db = require("../models");
const { BASE_URL, DEPLOY_ENV } = process.env;

/**
 * Adds URL/Redirect record to db
 */
const newURL = async (req, res) => {
  try {
    let { url } = req.body;
    if (!url) return res.json({ status: "error" });

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `http://${url}`;
    }

    const hash = await generateHash();

    await db.Urls.create({ url, hash });
    res.json({ short: `${BASE_URL}/${hash}` });
    return;
  } catch (err) {
    console.log(`ERROR::${err}`);
  }
};

/**
 * Returns all records (only if in dev mode)
 */
const findAll = async (req, res) => {
  if (DEPLOY_ENV === "dev") {
    const data = await db.Urls.find({});
    res.json(data);
  } else {
    res.status(401);
  }
};

/**
 * Redirects user to long URL
 */
const redirect = async (req, res) => {
  try {
    const param = req.params[0];
    const hash = param.substr(1, param.length);

    const { url } = await db.Urls.findOne({ hash });
    res.redirect(url);
  } catch (err) {
    console.log(`ERROR::${err}`);
    res.redirect("/");
  }
};

/**
 * Generates random 5 char hash
 */
const generateHash = async () => {
  const options =
    "1234567890poiuytrewqasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAZXCVBNM";
  const hash = Array.apply(null, Array(5))
    .map(() => options[Math.floor(Math.random() * options.length)])
    .join("");

  const alreadyExists = (await db.Urls.count({ hash })) > 0;
  if (alreadyExists) return generateHash();
  return hash;
};

module.exports = { newURL, findAll, redirect };
