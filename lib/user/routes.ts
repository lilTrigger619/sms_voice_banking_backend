import { Router } from "express";
import { RegisterController, AllUsersController } from "./controllers";

const UserRoute = Router();

UserRoute.route("/?").get(AllUsersController);

export default UserRoute;
