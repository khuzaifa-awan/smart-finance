import mongoose from "mongoose";

const UserPreferencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  location: String,
  dependents: Number,
  monthlyFixedExpenses: Number,
  savingsGoal: Number,
  monthlyBudget: Number,
  budgetSource: {
    type: String,
    enum: ["AI_GENERATED", "USER_SET"],
    default: "USER_SET",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

export default mongoose.models.UserPreferences ||
  mongoose.model("UserPreferences", UserPreferencesSchema);
