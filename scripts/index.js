const moment = require("moment");
const { scheduleJob } = require("node-schedule");
const db = require("../models");

/**
 * Delete Expired URLs
 */
const deleteExpired = async () => {
  console.log("::Cleaning Database::");
  const checkDate = moment()
    .subtract(14, "d")
    .toDate();

  const { deletedCount } = await db.Urls.deleteMany({
    createdAt: { $lt: checkDate }
  });
  console.log(`::Deleted ${deletedCount} expired URL(s)::`);
};

/**
 * Schedule Deletion Job
 */
const scheduleDelete = () => {
  deleteExpired(); // <-- Trigger reschedule on server restart
  console.log("::Deletion job scheduled::");
  scheduleJob("0 0 * * *", deleteExpired); // <-- Run at midnight each day
};

module.exports = { scheduleDelete };
