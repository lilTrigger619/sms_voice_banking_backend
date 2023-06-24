"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = exports.AccountSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AccountSchema = new mongoose_1.default.Schema({
    accountName: String,
    accountUsers: [String]
});
exports.AccountSchema = AccountSchema;
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
    },
    token: String,
    reg: String,
});
const SessionSchema = new mongoose_1.default.Schema({
    sid: String,
    lastDid: String,
});
exports.SessionSchema = SessionSchema;
console.log({ model: mongoose_1.default.model("at user", UserSchema) });
exports.default = mongoose_1.default.model("atuser", UserSchema);
//# sourceMappingURL=models.js.map