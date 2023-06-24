"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function DbConnect() {
    const { MONGO_URI } = process.env;
    mongoose_1.default.connect(MONGO_URI !== null && MONGO_URI !== void 0 ? MONGO_URI : "")
        .then(() => { console.log("database connection success"); })
        .catch((e) => {
        console.log("Database connection failed. Exiting now.");
        console.error(e);
        process.exit(1);
    });
}
exports.default = DbConnect;
;
//# sourceMappingURL=dbconnect.js.map