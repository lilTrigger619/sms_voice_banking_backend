import { NextFunction, Request, Response } from "express";
import UserModel from "./models";
import axios from "axios";

async function HandleUssd(req: Request, res: Response): Promise<Response> {
	const { sessionId, serviceCode, phoneNumber, text } = req.body;
	req.headers["content-type"] = "text/plain";
	console.log({ serviceCode, phoneNumber, text });
	// check if the user already exists.
	try {
		const theUser = await UserModel.findOne({ phoneNumber });

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
			} else if (!theUser.lastName) {
				theUser.lastName = text;
				theUser.save();
				return res.status(200).send("CON Enter your password.");
			} else {
				theUser.password = text;
				theUser.save();
				return res
					.status(200)
					.send("CON You have sucessfully created an account with us.\n");
			}
		}
	} catch (e) {
		console.log("failed to find a user.", { e });
		res.status(200).send("CON an unknown error occurred while trying to find the user.");
	}
	// when there is no account.
	//
	console.log("there was no user.")
	switch (text) {
		case "1":
			//const fd = new FormData();
			//register the user.
			console.log("got to 1")
			try {
				await UserModel.create({ phoneNumber });
				return res.status(200).send("CON  please enter your first name.\n");
			} catch (e) {
				console.log({ e });
				return res
					.status(200)
					.send("CON Oops something happend failed to create user account.");
			}

		case "2":
			console.log("got to 2")
			return res.status(200).send("CON Ok comeback next time.");
		default:
			console.log("got to the default");
			req.headers["content-type"] = "text/plain";
			return res.status(200).send("CON Seems you have no account with us.\n1. Register\n2. Exit");
		//register the user using sms
	}
}

export { HandleUssd };
