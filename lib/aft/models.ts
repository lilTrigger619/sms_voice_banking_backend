import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
	accountName: String,
	accountUsers: [String]
});

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

const SessionSchema = new mongoose.Schema({
	sid: String,
	lastDid: String,
});

console.log({model: mongoose.model("at user", UserSchema)});
export default mongoose.model("atuser", UserSchema);
export {AccountSchema, SessionSchema};
