const mongoose = require("mongoose");
const logger = require("./logger");


module.exports = function() {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => logger.info("mongodb bağlantısı kuruldu."))
}