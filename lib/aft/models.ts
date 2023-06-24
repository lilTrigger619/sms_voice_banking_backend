import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
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
	},
	token: String,
	reg: String,
});
console.log({model: mongoose.model("at user", UserSchema)});
export default mongoose.model("atuser", UserSchema);
