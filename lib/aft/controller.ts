import { NextFunction, Request, Response } from "express";
import UserModel, { SessionSchema, AccountSchema } from "./models";
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
			} else if (!theUser.lastName) {
				theUser.lastName = text;
				theUser.save();
				return res.status(200).send("CON Enter your password.");
			} else {
				theUser.password = text;
				theUser.save();
				try {
					const fd = new FormData();
					fd.append("username", "sandbox");
					fd.append("to", theUser.phoneNumber + "theUser.phoneNumber");
					fd.append("from", "6190");
					const messageStatus = await axios.post(
						" https://api.sandbox.africastalking.com/version1/messaging",
						fd,
						{
							headers: {
								accept: "application/json",
								"content-type": "application/x-www-form-urlencoded",
								"api-key":
									process.env.AFT_API_KEY ??
									"48f4212dfb6f615829ed2d0798f34376a6de9c2ddce9dcb2239adb0d6c966cac",
							},
						}
					);
					console.log({ messageStatus });
					//username=MyAppUsername&to=%2B254711XXXYYY,%2B254733YYYZZZ&message=Hello%20World!&from=myShortCode
				} catch (e) {
					console.log("failed to send message", { e });
				}
				return res
					.status(200)
					.send("CON You have sucessfully created an account with us.\n");
			}
		}
	} catch (e) {
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
				await UserModel.create({ phoneNumber });
				return res.status(200).send("CON  please enter your first name.\n");
			} catch (e) {
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
}

/**
async function  HandleSession(sessionId):void{
	try{
		const sid = SessionSchema.findOne(sessionId);

		//sid.lastDid("");
		switch(sid.lastDid){
			case "createAccount": 
				// acccount name;				
				AccountSchema.cr	
		};
	}catch(e){
		console.log("failed to find user",{e});
	};
};
**/

export { HandleUssd };
