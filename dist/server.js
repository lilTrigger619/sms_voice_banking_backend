"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const baseRoutes_1 = __importDefault(require("./baseRoutes"));
const dbconnect_1 = __importDefault(require("./dbconnect"));
require("dotenv/config");
(0, dbconnect_1.default)();
const { SERVER_PORT } = process.env;
baseRoutes_1.default.forEach(routeMiddleware => {
    app_1.default.use(...routeMiddleware);
});
app_1.default.listen(SERVER_PORT, () => {
    console.log("Express server listening on port " + SERVER_PORT);
});
//# sourceMappingURL=server.js.map