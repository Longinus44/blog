"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app_1 = require("./App/Config/app");
var body_parser_1 = __importDefault(require("body-parser"));
var port = app_1.AppConfig.PORT;
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.listen(port, function () {
    console.log("app is live on port ".concat(port));
});
