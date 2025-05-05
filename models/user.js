import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  authType: { type: String, default: "credentials" }, // "credentials" or "google"
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
