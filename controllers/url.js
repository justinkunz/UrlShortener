const db = require("../models");
const { BASE_URL } = process.env;

const newURL = async (req, res) => {
  try {
    let { url } = req.body;
    if (!url) return res.json({ status: "error" });

    if (!url.startsWith("http://") || !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    const hash = generateHash();

    await db.Urls.create({ url, hash });
    res.json({ short: `${BASE_URL}/${hash}` });
    return;
  } catch (err) {
    console.log(`ERROR::${err}`);
  }
};

const findAll = async (req, res) => {
  const data = await db.Urls.find({});
  res.json(data);
};

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

const generateHash = () => {
  const options =
    "1234567890poiuytrewqasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAZXCVBNM";
  return Array.apply(null, Array(6))
    .map(() => options[Math.floor(Math.random() * options.length)])
    .join("");
};

module.exports = { newURL, findAll, redirect };
