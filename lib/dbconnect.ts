import mongoose from "mongoose";

export default function DbConnect (){
	const {MONGO_URI} = process.env;
	mongoose.connect(MONGO_URI??"")
	.then(()=>{console.log("database connection success")})
	.catch((e)=>{
		console.log("Database connection failed. Exiting now.");
		console.error(e);
		process.exit(1);
	});
};
