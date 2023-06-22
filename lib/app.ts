import Express from "express";
import BodyParser from "body-parser";
import Winston from "winston";
import ExpressWinston from "express-winston";

const wLogger = ExpressWinston.logger({
	transports: [
		new Winston.transports.Console(),
	],
	format: Winston.format.combine(
		//Winston.format.colorize(),
		Winston.format.json(),
	),
	meta: false,
	msg: "HTTP {{req.method}}:{{req.statusCode}} {{req.url}} {{res.responseTime}}",
	expressFormat:true,
	colorize:false,
	ignoreRoute: (req, res)=>false,
});

class App{
	public app: Express.Application;

	constructor(){
		this.app = Express();
		this.config();
	};

	private config(): void{
		// support application/json type post data
		this.app.use(BodyParser.json());
		// support application/x-www-form-urlencoded post data
		this.app.use(BodyParser.urlencoded({extended:false}));
		// logging every request in the terminal.
		this.app.use(wLogger);
	};
};

export default new App().app;
