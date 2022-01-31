"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base62_1 = __importDefault(require("base62"));
var md5_1 = __importDefault(require("crypto-js/md5"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var aws_1 = require("../aws");
var models_1 = require("../models");
var BUCKET_NAME = "safebin";
var createBucket = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, aws_1.s3.root
                        .createBucket({
                        Bucket: BUCKET_NAME,
                    })
                        .promise()];
            case 1:
                result = _a.sent();
                console.log("Bucket " + BUCKET_NAME + " created.");
                return [2 /*return*/, { hasErrror: false }];
            case 2:
                err_1 = _a.sent();
                if (err_1.code === "BucketAlreadyOwnedByYou") {
                    console.log("Bucket " + BUCKET_NAME + " already exists.");
                    return [2 /*return*/, { hasError: false }];
                }
                console.log("Error creating bucket " + BUCKET_NAME + ":\n" + aws_1.p(err_1));
                return [2 /*return*/, { hasError: true, err: err_1 }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createTable = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, aws_1.ddb.root.createTable(models_1.Paste.schema).promise()];
            case 1:
                result = _a.sent();
                console.log("Table " + models_1.Paste.schema.TableName + " successfully created.");
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                if (err_2.code === "ResourceInUseException") {
                    console.log("Table " + models_1.Paste.schema.TableName + " already created.");
                }
                else {
                    console.error("Error creating table " + models_1.Paste.schema.TableName + ":\n" + aws_1.p(err_2));
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var insert = function (paste) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, aws_1.ddb.client.put(models_1.Paste.create(paste)).promise()];
            case 1:
                result = _a.sent();
                console.log("Created paste with link " + paste.short_link);
                return [2 /*return*/, { hasError: false, paste: paste }];
            case 2:
                err_3 = _a.sent();
                console.log("Error creating paste:\n" + aws_1.p(err_3));
                return [2 /*return*/, { hasError: true, err: err_3 }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var get = function (short_link, userPassword) { return __awaiter(void 0, void 0, void 0, function () {
    var rawPaste, paste, has_password, password, _a, fetchPastePathResult, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                return [4 /*yield*/, aws_1.ddb.client.get(models_1.Paste.read(short_link)).promise()];
            case 1:
                rawPaste = _b.sent();
                if (Object.keys(rawPaste).length === 0) {
                    console.log("Error reading paste with link " + short_link + ": paste does not exist.");
                    return [2 /*return*/, { hasEror: true, err: { code: "PasteDoesNotExist" } }];
                }
                else {
                    console.log("Read paste with link " + short_link);
                }
                paste = rawPaste.Item;
                if (!(paste.expiration_time < Date.now())) return [3 /*break*/, 3];
                console.log("Paste " + short_link + " has expired.");
                return [4 /*yield*/, remove(short_link)];
            case 2:
                _b.sent();
                return [2 /*return*/, { hasError: true, err: { code: "PasteExpired" } }];
            case 3:
                has_password = paste.has_password, password = paste.password;
                _a = has_password;
                if (!_a) return [3 /*break*/, 5];
                return [4 /*yield*/, verifyPassword(userPassword, password)];
            case 4:
                _a = !(_b.sent());
                _b.label = 5;
            case 5:
                if (_a) {
                    return [2 /*return*/, { hasError: true, err: { code: "IncorrectPassword" } }];
                }
                return [4 /*yield*/, fetchPastePath(short_link)];
            case 6:
                fetchPastePathResult = _b.sent();
                if (fetchPastePathResult.hasError) {
                    return [2 /*return*/, { hasError: true, err: fetchPastePathResult.err }];
                }
                return [4 /*yield*/, incrementReads(short_link)];
            case 7:
                _b.sent();
                return [2 /*return*/, {
                        hasError: false,
                        paste: __assign(__assign({}, paste), { paste_content: fetchPastePathResult.pasteContent }),
                    }];
            case 8:
                err_4 = _b.sent();
                console.log("Error reading paste with link " + short_link + ":\n" + aws_1.p(err_4));
                return [2 /*return*/, { hasError: true, err: err_4 }];
            case 9: return [2 /*return*/];
        }
    });
}); };
var incrementReads = function (short_link) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, aws_1.ddb.client
                        .update(models_1.Paste.update({
                        short_link: short_link,
                        updateExpression: "set read_count = read_count + :r",
                        expressionAttributes: {
                            ":r": 1,
                        },
                    }))
                        .promise()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, { hasError: false, result: result }];
            case 2:
                err_5 = _a.sent();
                console.log("Error updating read count for paste " + short_link + ":\n" + aws_1.p(err_5));
                return [2 /*return*/, { hasError: true, err: err_5 }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var remove = function (short_link) { return __awaiter(void 0, void 0, void 0, function () {
    var result, pathRes, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, aws_1.ddb.client.delete(models_1.Paste.del(short_link)).promise()];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, deletePastePath(short_link)];
            case 2:
                pathRes = _a.sent();
                console.log("Deleted paste with link " + short_link);
                return [2 /*return*/, { hasError: false, result: result }];
            case 3:
                err_6 = _a.sent();
                console.log("Error deleting paste with link " + short_link + ":\n" + aws_1.p(err_6));
                return [2 /*return*/, { hasError: true, err: err_6 }];
            case 4: return [2 /*return*/];
        }
    });
}); };
var exists = function (short_link) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hasError, err, paste;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, get(short_link, "")];
            case 1:
                _a = _b.sent(), hasError = _a.hasError, err = _a.err, paste = _a.paste;
                return [2 /*return*/, !!(hasError && err === "PasteNotExist")];
        }
    });
}); };
var generateShortLink = function (ip) { return __awaiter(void 0, void 0, void 0, function () {
    var link, hashString, hashInt, encoded;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hashString = md5_1.default(ip + Date.now().toString()).toString();
                hashInt = parseInt(hashString, 16);
                encoded = base62_1.default.encode(hashInt);
                link = encoded.substr(0, 7);
                _a.label = 1;
            case 1: return [4 /*yield*/, exists(link)];
            case 2:
                if (_a.sent()) return [3 /*break*/, 0];
                _a.label = 3;
            case 3: return [2 /*return*/, link];
        }
    });
}); };
var encryptPassword = function (password) { return __awaiter(void 0, void 0, void 0, function () {
    var SALT_ROUNDS, encrypted, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                SALT_ROUNDS = 10;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bcrypt_1.default.hash(password, SALT_ROUNDS)];
            case 2:
                encrypted = _a.sent();
                return [2 /*return*/, encrypted];
            case 3:
                err_7 = _a.sent();
                console.log("Error encrypting password: \n" + aws_1.p(err_7));
                return [2 /*return*/, password];
            case 4: return [2 /*return*/];
        }
    });
}); };
var verifyPassword = function (password, hashPassword) { return __awaiter(void 0, void 0, void 0, function () {
    var err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bcrypt_1.default.compare(password, hashPassword)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                err_8 = _a.sent();
                console.log("Error verifying password:\n" + aws_1.p(err_8));
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getPastePath = function (shortLink, pasteContent) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, aws_1.s3.root
                        .upload({
                        Bucket: BUCKET_NAME,
                        Key: shortLink + ".txt",
                        Body: pasteContent,
                    })
                        .promise()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.Location];
            case 2:
                err_9 = _a.sent();
                console.log("Error uploading data for paste " + shortLink + ":\n" + aws_1.p(err_9));
                return [2 /*return*/, ""];
            case 3: return [2 /*return*/];
        }
    });
}); };
var fetchPastePath = function (shortLink) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, aws_1.s3.root
                        .getObject({
                        Bucket: BUCKET_NAME,
                        Key: shortLink + ".txt",
                    })
                        .promise()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, { hasError: false, pasteContent: (data.Body || "").toString() }];
            case 2:
                err_10 = _a.sent();
                console.log("Error fetching paste content for " + shortLink + ":\n" + aws_1.p(err_10));
                return [2 /*return*/, { hasError: true, err: err_10 }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deletePastePath = function (shortLink) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, aws_1.s3.root
                        .deleteObject({
                        Bucket: BUCKET_NAME,
                        Key: shortLink + ".txt",
                    })
                        .promise()];
            case 1:
                data = _a.sent();
                console.log("Deleted paste content for " + shortLink);
                return [2 /*return*/, { hasError: false }];
            case 2:
                err_11 = _a.sent();
                console.log("Error deleting paste content for " + shortLink + ":\n" + aws_1.p(err_11));
                return [2 /*return*/, { hasError: true, err: err_11 }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var formatRawData = function (_a) {
    var expirationLength = _a.expirationLength, hasPassword = _a.hasPassword, password = _a.password, language = _a.language, title = _a.title, pasteContent = _a.pasteContent, ip = _a.ip;
    return __awaiter(void 0, void 0, void 0, function () {
        var now, link, paste;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    now = Date.now();
                    return [4 /*yield*/, generateShortLink(ip)];
                case 1:
                    link = _c.sent();
                    _b = {
                        short_link: link,
                        created_at: now,
                        expiration_time: now + expirationLength,
                        has_password: hasPassword
                    };
                    return [4 /*yield*/, encryptPassword(password)];
                case 2:
                    _b.password = _c.sent(),
                        _b.read_count = 0,
                        _b.title = title,
                        _b.language = language;
                    return [4 /*yield*/, getPastePath(link, pasteContent)];
                case 3:
                    paste = (_b.paste_path = _c.sent(),
                        _b);
                    return [2 /*return*/, paste];
            }
        });
    });
};
exports.default = {
    createBucket: createBucket,
    createTable: createTable,
    insert: insert,
    get: get,
    formatRawData: formatRawData,
};
