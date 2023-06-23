import { NextFunction, Request, Response } from "express";
import UserModel from "../user/models";

async function HandleUssd(req: Request, res: Response): Promise<Response> {
	const { sessionId, serviceCode, phoneNumber, text } = req.body;
	console.log({ sessionId, serviceCode, phoneNumber, text });
	// check if the user already exists.
	const theUser = await UserModel.findOne({ phoneNumber });

	// when the user is has already created account.
	if (theUser) {
		// if this is the first message
		if (text == "") {
			const messageBody =
				"CON Choose account information you want to view \n" +
				"1. Account information\n" +
				"2. Send message\n";

			req.headers["content-type"] = "text/plain";
			return res.status(200).send(messageBody);
		}
	}

	// when there is no account.
	if (text == "") {
		const messageBody =
			"Would you like to register\n" + "1. Register" + "2. Cancel";
		req.headers["content-type"] = "text/plain";
		return res.status(200).send(messageBody);
	}

	console.log("got here");
	const messageBody =
		"Would you like to register\n" + "1. Register" + "2. Cancel";
	req.headers["content-type"] = "text/plain";
	return res.status(200).send(messageBody);
}

export { HandleUssd };
