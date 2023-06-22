import {Router, Request, Response} from "express";

const BaseRoutes = Router();

BaseRoutes.get("*", (req:Request, res:Response)=>{
	return res.status(200).json("test ok");
});

export default BaseRoutes;
