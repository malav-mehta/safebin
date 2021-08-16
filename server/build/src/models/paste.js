"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema = {
    TableName: "Pastes",
    KeySchema: [
        {
            AttributeName: "short_link",
            KeyType: "HASH",
        },
    ],
    AttributeDefinitions: [
        {
            AttributeName: "short_link",
            AttributeType: "S",
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
};
var create = function (paste) {
    return {
        TableName: schema.TableName,
        Item: paste,
    };
};
var read = function (short_link) {
    return {
        TableName: schema.TableName,
        Key: {
            short_link: short_link,
        },
    };
};
var update = function (_a) {
    var short_link = _a.short_link, updateExpression = _a.updateExpression, expressionAttributes = _a.expressionAttributes;
    return {
        TableName: schema.TableName,
        Key: {
            short_link: short_link,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributes,
        ReturnValues: "UPDATED_NEW",
    };
};
var del = function (short_link) {
    return {
        TableName: schema.TableName,
        Key: {
            short_link: short_link,
        },
    };
};
exports.default = {
    schema: schema,
    create: create,
    read: read,
    update: update,
    del: del,
};
