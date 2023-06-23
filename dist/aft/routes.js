"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const AftRoutes = (0, express_1.Router)();
AftRoutes.route("/?").post(controller_1.HandleUssd);
exports.default = AftRoutes;
//# sourceMappingURL=routes.js.map