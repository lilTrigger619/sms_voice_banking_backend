import { Router } from "express";
import { RegisterController, LoginController, AllUsersController } from "./controllers";

const UserRoute = Router();

UserRoute.route("/register").post(RegisterController);
UserRoute.route("/login").post(LoginController);
UserRoute.route("/?*").get(AllUsersController);

export default UserRoute;
