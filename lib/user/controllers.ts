import { Request, Response } from "express";
import { ResponseCode } from "../utils/constants";

function RegisterController(req: Request, res: Response): Response {
	return res.status(ResponseCode.SUCCESS).json({ message: "ok" });
}

function AllUsersController(_: Request, res: Response): Response {
	return res.status(ResponseCode.SUCCESS).json({ message: "all users" });
}

export { RegisterController, AllUsersController };
