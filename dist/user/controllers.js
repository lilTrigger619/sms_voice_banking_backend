"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = exports.LoginController = exports.AllUsersController = exports.RegisterController = void 0;
const constants_1 = require("../utils/constants");
const models_1 = __importDefault(require("./models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
// login crontroller for the user.
function RegisterController(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, firstName, lastName } = req.body;
        const existingUser = yield models_1.default.findOne({ email });
        // if the user already exists.
        if (existingUser)
            return res
                .status(constants_1.ResponseCode.BAD_REQUEST)
                .json({ message: "user already exist" });
        // try to validate the user.
        try {
            yield models_1.default.validate({ email, password, firstName, lastName });
        }
        catch (err) {
            return res
                .status(constants_1.ResponseCode.BAD_REQUEST)
                .json({ message: "user validation error" });
        }
        // try to create user and save.
        try {
            const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = yield models_1.default.create({
                email,
                password: encryptedPassword,
                firstName,
                lastName,
            });
            // sign a new token for the user.
            const token = jsonwebtoken_1.default.sign({ user_id: newUser._id, email }, (_a = process.env.JWT_TOKEN_KEY) !== null && _a !== void 0 ? _a : "shaddy", { expiresIn: (_b = process.env.TOKEN_DURATION) !== null && _b !== void 0 ? _b : "2h" });
            newUser.token = token;
            newUser.save();
            return res.status(constants_1.ResponseCode.CREATED).json({ message: newUser });
        }
        catch (e) {
            console.log("failed to create tuser", e);
            return res
                .status(constants_1.ResponseCode.INTERNAL_SERVER_ERROR)
                .json({ message: "failed to create the user" });
        }
    });
}
exports.RegisterController = RegisterController;
function LoginController(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email && !password)
            return res
                .status(constants_1.ResponseCode.UNAUTHORIZED)
                .json({ message: "all fields are required" });
        // try get user from db.
        try {
            const user = yield models_1.default.findOne({ email });
            const samePass = yield bcryptjs_1.default.compare(password, (_a = user === null || user === void 0 ? void 0 : user.password) !== null && _a !== void 0 ? _a : " ");
            console.log({ samePass });
            if (!user || !samePass)
                return res
                    .status(constants_1.ResponseCode.UNAUTHORIZED)
                    .json({ message: "no user found with provided credentials!" });
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, (_b = process.env.JWT_TOKEN_KEY) !== null && _b !== void 0 ? _b : "shadrack", { expiresIn: (_c = process.env.TOKEN_DURATION) !== null && _c !== void 0 ? _c : "2h" });
            user.token = token;
            user.save();
            return res.status(constants_1.ResponseCode.SUCCESS).json({ token: token });
        }
        catch (e) {
            console.log("login error", e);
            return res
                .status(constants_1.ResponseCode.INTERNAL_SERVER_ERROR)
                .json({ message: "login failed" });
        }
    });
}
exports.LoginController = LoginController;
// verify token controller.
function VerifyToken(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.body.token ||
            req.query.token ||
            req.params.token ||
            req.headers["x-access-token"];
        if (!token)
            return res.status(constants_1.ResponseCode.UNAUTHORIZED).json({ message: "" });
        try {
            const Decoded = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_TOKEN_KEY) !== null && _a !== void 0 ? _a : "shadrack");
            console.log({ Decoded });
            req["user"] = Decoded;
            return next();
        }
        catch (e) {
            return res.status(constants_1.ResponseCode.UNAUTHORIZED).json({ message: "" });
        }
    });
}
exports.VerifyToken = VerifyToken;
function AllUsersController(_, res) {
    return res.status(constants_1.ResponseCode.SUCCESS).json({ message: "all users" });
}
exports.AllUsersController = AllUsersController;
//# sourceMappingURL=controllers.js.map