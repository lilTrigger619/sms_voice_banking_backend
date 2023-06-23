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
        req.headers["content-type"] = "text/plain";
        //console.log({ sessionId, serviceCode, phoneNumber, text });
        // check if the user already exists.
        const theUser = yield models_1.default.findOne({ phoneNumber });
        // when the user is has already created account.
        if (theUser) {
            // if this is the first message
            if (theUser.firstName && theUser.lastName && theUser.password) {
                return res.status(200).send("You already have and account.");
            }
            if (!theUser.firstName) {
                theUser.firstName = text;
                theUser.save();
                return res.status(200).send("Enter your last name");
            }
            else if (!theUser.lastName) {
                theUser.lastName = text;
                theUser.save();
                return res.status(200).send("Enter your password.");
            }
            else {
                theUser.password = text;
                theUser.save();
                return res
                    .status(200)
                    .send("You have sucessfully created an account with us.\n");
            }
        }
        // when there is no account.
        //
        switch (text) {
            case "1":
                //const fd = new FormData();
                //register the user.
                try {
                    yield models_1.default.create({ phoneNumber });
                    return res.status(200).send("CON  please enter your first name.\n");
                }
                catch (e) {
                    console.log({ e });
                    return res
                        .status(200)
                        .json("Oops something happend failed to create user account.");
                }
            case "2":
                return res.status(200).send("Ok comeback next time.");
            default:
                return res.status(200).send("Incorrect input please try again.");
            //register the user using sms
        }
    });
}
exports.HandleUssd = HandleUssd;
//# sourceMappingURL=controller.js.map