"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_1 = require("./aws");
Object.defineProperty(exports, "AWS", { enumerable: true, get: function () { return aws_1.default; } });
__exportStar(require("./aws"), exports);
var ddb_1 = require("./ddb");
Object.defineProperty(exports, "ddb", { enumerable: true, get: function () { return ddb_1.default; } });
__exportStar(require("./ddb"), exports);
var p_1 = require("./p");
Object.defineProperty(exports, "p", { enumerable: true, get: function () { return p_1.default; } });
__exportStar(require("./p"), exports);
var s3_1 = require("./s3");
Object.defineProperty(exports, "s3", { enumerable: true, get: function () { return s3_1.default; } });
__exportStar(require("./s3"), exports);
