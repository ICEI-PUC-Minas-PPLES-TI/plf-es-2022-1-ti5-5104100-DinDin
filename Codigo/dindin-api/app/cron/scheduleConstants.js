// https://crontabkit.com/crontab-expression-generator

const EVERY_SECOND = "* * * * * *";
const EVERY_30_SECONDS = "*/30 * * * * *";
const EVERY_MINUTE = "* * * * * ";
const EVERY_30_MINUTES = "*/30 * * * *";
const EVERY_HOUR = "0 0 * * * *";
const EVERY_DAY_00AM = "0 0 * * *"; // At 12:00 AM
const EVERY_DAY_03AM = "0 3 * * *"; // At 03:00 AM

module.exports = {
    EVERY_SECOND,
    EVERY_30_SECONDS,
    EVERY_MINUTE,
    EVERY_30_MINUTES,
    EVERY_HOUR,
    EVERY_DAY_00AM,
    EVERY_DAY_03AM,
};
