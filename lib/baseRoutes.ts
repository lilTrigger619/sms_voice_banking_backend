import { Response, Request, Router } from "express";
import { ResponseCode } from "./utils/constants";
import UserRoute from "./user/routes";
import AftRoutes from "./aft/routes";

const DefaultRoute = (req: Request, res: Response) =>
	res.status(ResponseCode.SUCCESS).json({ message: "defualt route" });

const BaseRoutes: Set<
	[string, ((req: Request, res: Response) => Response) | Router]
> = new Set([
	["/ussd", AftRoutes],
	["/user", UserRoute],
	["*", DefaultRoute],
]);
//BaseRoutes.add();
//BaseRoutes.add();

export default BaseRoutes;
