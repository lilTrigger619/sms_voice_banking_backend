import { Request, Response } from "express";
import { ResponseCode } from "../utils/constants";
import UserModel from "./models";
import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// login crontroller for the user.
async function RegisterController(
	req: Request,
	res: Response
): Promise<Response> {
	const { email, password, firstName, lastName } = req.body;
	const existingUser = await UserModel.findOne({ email });
	// if the user already exists.
	if (existingUser)
		return res
			.status(ResponseCode.BAD_REQUEST)
			.json({ message: "user already exist" });
	// try to validate the user.
	try {
		await UserModel.validate({ email, password, firstName, lastName });
	} catch (err) {
		return res
			.status(ResponseCode.BAD_REQUEST)
			.json({ message: "user validation error" });
	}
	// try to create user and save.
	try {
		const encryptedPassword = await Bcrypt.hash(password, 10);
		const newUser = await UserModel.create({
			email,
			password: encryptedPassword,
			firstName,
			lastName,
		});
		// sign a new token for the user.
		const token = jwt.sign(
			{ user_id: newUser._id, email },
			process.env.JWT_TOKEN_KEY ?? "shaddy",
			{ expiresIn: process.env.TOKEN_DURATION ?? "2h" }
		);
		newUser.token = token;
		newUser.save();
		return res.status(ResponseCode.CREATED).json({ message: newUser });
	} catch (e) {
		console.log("failed to create tuser", e);
		return res
			.status(ResponseCode.INTERNAL_SERVER_ERROR)
			.json({ message: "failed to create the user" });
	}
}

async function LoginController(req: Request, res: Response): Promise<Response> {
	const { email, password } = req.body;
	if (!email && !password)
		return res
			.status(ResponseCode.UNAUTHORIZED)
			.json({ message: "all fields are required" });
	// try get user from db.
	try{
		const user = await UserModel.findOne({ email });
		const samePass = await Bcrypt.compare(password, user?.password ?? " ");
		console.log({samePass});
		if (!user || !samePass)
			return res
		.status(ResponseCode.UNAUTHORIZED)
		.json({ message: "no user found with provided credentials!" });
		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.JWT_TOKEN_KEY ?? "shadrack",
			{ expiresIn: process.env.TOKEN_DURATION ?? "2h" }
		);
		user.token = token;
		user.save();
		return res.status(ResponseCode.SUCCESS).json({token:token});
	}catch(e){
		console.log("login error", e);
		return res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({message:"login failed"});
	}
}

function AllUsersController(_: Request, res: Response): Response {
	return res.status(ResponseCode.SUCCESS).json({ message: "all users" });
}

export { RegisterController, AllUsersController,LoginController };
