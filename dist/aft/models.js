"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
console.log({ model: mongoose_1.default.model("at user", UserSchema) });
exports.default = mongoose_1.default.model("atuser", UserSchema);
//# sourceMappingURL=models.js.map