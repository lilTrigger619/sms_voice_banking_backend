import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},
	lasName: {
		type: String,
	},
	phoneNumber: {
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
	reg: String,
});
console.log({model: mongoose.model("user", UserSchema)});
export default mongoose.model("user", UserSchema);
