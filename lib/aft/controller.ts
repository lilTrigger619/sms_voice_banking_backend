import { NextFunction, Request, Response } from "express";
import UserModel from "../user/models";
import axios from "axios";

async function HandleUssd(req: Request, res: Response): Promise<Response> {
	const { sessionId, serviceCode, phoneNumber, text } = req.body;
	req.headers["content-type"] = "text/plain";
	//console.log({ sessionId, serviceCode, phoneNumber, text });
	// check if the user already exists.
	const theUser = await UserModel.findOne({ phoneNumber });

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
		} else if (!theUser.lastName) {
			theUser.lastName = text;
			theUser.save();
			return res.status(200).send("Enter your password.");
		} else {
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
				await UserModel.create({ phoneNumber });
				return res.status(200).send("CON  please enter your first name.\n");
			} catch (e) {
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
}

export { HandleUssd };
