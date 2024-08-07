import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sections: { type: Array, default: [] },
  words: { type: Array, default: [] },
});

const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;
