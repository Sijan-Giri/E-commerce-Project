"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const sequelize = new sequelize_1.Sequelize(dbConfig_1.default.db, dbConfig_1.default.password, dbConfig_1.default.username, {
    host: dbConfig_1.default.host,
    port: 3306,
    dialect: dbConfig_1.default.dialect,
    pool: {
        acquire: dbConfig_1.default.pool.acquire,
        min: dbConfig_1.default.pool.min,
        max: dbConfig_1.default.pool.max,
        idle: dbConfig_1.default.pool.idle
    }
});
sequelize
    .authenticate()
    .then(() => {
    console.log("Database connected successfully");
})
    .catch((err) => {
    console.log("Something went wrong!", err);
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({ force: false }).then(() => {
    console.log("Yes migrated");
});
exports.default = db;
