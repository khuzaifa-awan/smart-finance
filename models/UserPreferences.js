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
  age: Number,
  desiredSavingsPercentage: Number,
  cityTier: {
    type: String,
    enum: ["Tier 1", "Tier 2", "Tier 3"],
  },
  occupation: String,
  education: String,
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
