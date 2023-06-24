"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const UserRoute = (0, express_1.Router)();
UserRoute.route("/register").post(controllers_1.RegisterController);
UserRoute.route("/login").post(controllers_1.LoginController);
UserRoute.route("/?*").post(controllers_1.VerifyToken, controllers_1.AllUsersController).get(controllers_1.AllUsersController);
exports.default = UserRoute;
//# sourceMappingURL=routes.js.map