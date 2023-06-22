import App from "./app";
import "dotenv/config";
import baseRoutes from "./baseRoutes";
import DbConnect from "./dbconnect";
import "dotenv/config";

DbConnect();
const {SERVER_PORT} = process.env;

baseRoutes.forEach(routeMiddleware=>{
	App.use(...routeMiddleware);
});

App.listen(SERVER_PORT, ()=>{
	console.log("Express server listening on port "+SERVER_PORT);
});
