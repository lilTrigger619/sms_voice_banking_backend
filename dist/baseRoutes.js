"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./utils/constants");
const routes_1 = __importDefault(require("./user/routes"));
const DefaultRoute = (req, res) => res.status(constants_1.ResponseCode.SUCCESS).json({ message: "defualt route" });
const BaseRoutes = new Set([
    ["/user", routes_1.default],
    ["*", DefaultRoute],
]);
//BaseRoutes.add();
//BaseRoutes.add();
exports.default = BaseRoutes;
//# sourceMappingURL=baseRoutes.js.map