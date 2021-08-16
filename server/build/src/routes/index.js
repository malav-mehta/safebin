"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var paste_1 = __importDefault(require("./paste"));
var v1 = express_1.default.Router();
v1.use("/paste", paste_1.default);
exports.default = {
    v1: v1,
};
