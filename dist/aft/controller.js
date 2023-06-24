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
const models_1 = __importDefault(require("./models"));
const axios_1 = __importDefault(require("axios"));
function HandleUssd(req, res) {
    var _a;
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
                    // the user has already created an account.
                    let message;
                    switch (text) {
                        case "1":
                            return res
                                .status(200)
                                .send("CON Feature not implemented yet.\n0. Go back.");
                            break;
                        case "2":
                            return res
                                .status(200)
                                .send("CON Feature not implemented yet.\n0. Go back.");
                            break;
                        case "3":
                            return res
                                .status(200)
                                .send("CON Feature not implemented yet.\n0. Go back.");
                            break;
                        case "4":
                            message =
                                "CON First name: " +
                                    theUser.firstName +
                                    "\n" +
                                    "Last name: " +
                                    theUser.lastName +
                                    "\n" +
                                    "Phone: " +
                                    theUser.phoneNumber +
                                    "\n" +
                                    "Jonit accounts: 0";
                            return res.status(200).send(message);
                        default:
                            message =
                                "CON What would you like to do?\n" +
                                    "1. Joint accounts accounts\n" +
                                    "2. Create a new joint.\n" +
                                    "3.	check balance\n" +
                                    "4. Account info\n" +
                                    "5. make payment\n" +
                                    "6. Exit\n";
                            return res.status(200).send(message);
                    }
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
                    try {
                        const fd = new FormData();
                        fd.append("username", "sandbox");
                        fd.append("to", theUser.phoneNumber + "theUser.phoneNumber");
                        fd.append("from", "6190");
                        const messageStatus = yield axios_1.default.post(" https://api.sandbox.africastalking.com/version1/messaging", fd, {
                            headers: {
                                accept: "application/json",
                                "content-type": "application/x-www-form-urlencoded",
                                "api-key": (_a = process.env.AFT_API_KEY) !== null && _a !== void 0 ? _a : "48f4212dfb6f615829ed2d0798f34376a6de9c2ddce9dcb2239adb0d6c966cac",
                            },
                        });
                        console.log({ messageStatus });
                        //username=MyAppUsername&to=%2B254711XXXYYY,%2B254733YYYZZZ&message=Hello%20World!&from=myShortCode
                    }
                    catch (e) {
                        console.log("failed to send message", { e });
                    }
                    return res
                        .status(200)
                        .send("CON You have sucessfully created an account with us.\n");
                }
            }
        }
        catch (e) {
            console.log("failed to find a user.", { e });
            res
                .status(200)
                .send("CON an unknown error occurred while trying to find the user.");
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
                return res
                    .status(200)
                    .send("CON Seems you have no account with us.\n1. Register\n2. Exit");
            //register the user using sms
        }
    });
}
exports.HandleUssd = HandleUssd;
//# sourceMappingURL=controller.js.map