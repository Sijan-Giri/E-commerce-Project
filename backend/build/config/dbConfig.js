"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    host: "localhost",
    username: "root",
    password: "",
    db: "ecommerceproject",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 10000
    }
};
exports.default = dbConfig;
