import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: "first name is required",
	},
	lasName: {
		type: String,
		required: "last name is required",
	},
	email:{
		type: String,
		unique: true,
		//required: "email is required",
	},
	phone: {
		type: String,
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	password: {
		type: String,
		required: "password is required",
	},
	token: String,
});
	console.log({model: mongoose.model("user", UserSchema)});
export default mongoose.model("user", UserSchema);
