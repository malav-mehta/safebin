"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_1 = __importDefault(require("./aws"));
var ddb = {
    root: new aws_1.default.DynamoDB(),
    client: new aws_1.default.DynamoDB.DocumentClient(),
};
exports.default = ddb;
