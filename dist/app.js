"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const wLogger = express_winston_1.default.logger({
    transports: [
        new winston_1.default.transports.Console(),
    ],
    format: winston_1.default.format.combine(
    //Winston.format.colorize(),
    winston_1.default.format.json()),
    meta: false,
    msg: "HTTP {{req.method}}:{{req.statusCode}} {{req.url}} {{res.responseTime}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: (req, res) => false,
});
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
    }
    ;
    config() {
        // support application/json type post data
        this.app.use(body_parser_1.default.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        // logging every request in the terminal.
        this.app.use(wLogger);
    }
    ;
}
;
exports.default = new App().app;
//# sourceMappingURL=app.js.map