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
exports.HandleUssd = void 0;
const models_1 = __importDefault(require("../user/models"));
function HandleUssd(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sessionId, serviceCode, phoneNumber, text } = req.body;
        console.log({ sessionId, serviceCode, phoneNumber, text });
        // check if the user already exists.
        const theUser = yield models_1.default.findOne({ phoneNumber });
        // when the user is has already created account.
        if (theUser) {
            // if this is the first message
            if (text == "") {
                const messageBody = "CON Choose account information you want to view \n" +
                    "1. Account information\n" +
                    "2. Send message\n";
                req.headers["content-type"] = "text/plain";
                return res.status(200).send(messageBody);
            }
        }
        // when there is no account.
        if (text == "") {
            const messageBody = "CON Would you like to register\n" + "1. Register" + "2. Cancel";
            req.headers["content-type"] = "text/plain";
            return res.status(200).send(messageBody);
        }
        console.log("got here");
        const messageBody = "CON Would you like to register\n" + "1. Register\n" + "2. Cancel";
        req.headers["content-type"] = "text/plain";
        return res.status(200).send(messageBody);
    });
}
exports.HandleUssd = HandleUssd;
//# sourceMappingURL=controller.js.map