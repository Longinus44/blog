"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = exports.AppConfig = void 0;
var getenv_1 = require("./getenv");
exports.AppConfig = {
    PORT: (0, getenv_1.getEnv)('PORT'),
    jwtkey: String((0, getenv_1.getEnv)('jwtket')),
};
exports.dbConfig = {
    CLIENT: String((0, getenv_1.getEnv)('DB_CLIENT')),
    DB_USER: String((0, getenv_1.getEnv)('DB_USER')),
    DB_PASSWORD: String((0, getenv_1.getEnv)('DB_PASSWORD')),
    DB_NAME: String((0, getenv_1.getEnv)('DB_NAME')),
    DB_HOST: String((0, getenv_1.getEnv)('DB_HOST')),
    DB_PORT: String((0, getenv_1.getEnv)('DB_PORT'))
};
console.log(exports.dbConfig.CLIENT);
