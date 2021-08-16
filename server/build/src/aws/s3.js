"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_1 = __importDefault(require("./aws"));
var s3 = {
    root: new aws_1.default.S3({
        apiVersion: process.env.AWS_S3_API_VERSION || "2006-03-11",
    }),
};
exports.default = s3;
