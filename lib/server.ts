import App from "./app";
import "dotenv/config";
import baseRoute from "./baseRoutes";
//dotenv.config();

const {SERVER_PORT} = process.env;
//console.log(process.env);

App.use("/", baseRoute);

App.listen(SERVER_PORT, ()=>{
	console.log("Express server listening on port "+SERVER_PORT);
});
