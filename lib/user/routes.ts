import { Router } from "express";
import { RegisterController, LoginController, AllUsersController, VerifyToken } from "./controllers";

const UserRoute = Router();

UserRoute.route("/register").post(RegisterController);
UserRoute.route("/login").post(LoginController);
UserRoute.route("/?*").post(VerifyToken, AllUsersController).get(AllUsersController);

export default UserRoute;
