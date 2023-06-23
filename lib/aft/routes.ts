import {Router} from "express";
import { HandleUssd } from "./controller";

const AftRoutes = Router();

AftRoutes.route("/?").post(HandleUssd);

export default AftRoutes;
