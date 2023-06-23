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
    lasName: {
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
        required: "password is required",
    },
    token: String,
    reg: String,
});
console.log({ model: mongoose_1.default.model("user", UserSchema) });
exports.default = mongoose_1.default.model("user", UserSchema);
//# sourceMappingURL=model.js.map