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
        console.log({ serviceCode, phoneNumber, text });
        // check if the user already exists.
        try {
            const theUser = yield models_1.default.findOne({ phoneNumber });
            // when the user is has already created account.
            if (theUser) {
                console.log("user found");
                // if this is the first message
                if (theUser.firstName && theUser.lastName && theUser.password) {
                    return res.status(200).send("CON You already have and account.");
                }
                if (!theUser.firstName) {
                    theUser.firstName = text;
                    theUser.save();
                    return res.status(200).send("CON Enter your last name");
                }
                else if (!theUser.lastName) {
                    theUser.lastName = text;
                    theUser.save();
                    return res.status(200).send("CON Enter your password.");
                }
                else {
                    theUser.password = text;
                    theUser.save();
                    return res
                        .status(200)
                        .send("CON You have sucessfully created an account with us.\n");
                }
            }
        }
        catch (e) {
            console.log("failed to find a user.", { e });
            res.status(200).send("CON an unknown error occurred while trying to find the user.");
        }
        // when there is no account.
        //
        console.log("there was no user.");
        switch (text) {
            case "1":
                //const fd = new FormData();
                //register the user.
                console.log("got to 1");
                try {
                    yield models_1.default.create({ phoneNumber });
                    return res.status(200).send("CON  please enter your first name.\n");
                }
                catch (e) {
                    console.log({ e });
                    return res
                        .status(200)
                        .send("CON Oops something happend failed to create user account.");
                }
            case "2":
                console.log("got to 2");
                return res.status(200).send("CON Ok comeback next time.");
            default:
                console.log("got to the default");
                req.headers["content-type"] = "text/plain";
                return res.status(200).send("CON Seems you have no account with us.\n1. Register\n2. Exit");
            //register the user using sms
        }
    });
}
exports.HandleUssd = HandleUssd;
//# sourceMappingURL=controller.js.map