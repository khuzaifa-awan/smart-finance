import mongoose from "mongoose";

const goalContributionSchema = new mongoose.Schema(
  {
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
    },
    contributorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Optional, in case anonymous contributions are allowed
    },
    contributionAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    paymentMethod: {
      type: String,
      enum: ["Auto-Debit", "Cash Deposit", "Credit Card", "Bank Transfer"],
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Update the goal’s currentAmount automatically after saving a contribution
goalContributionSchema.post("save", async function (doc, next) {
  try {
    const Goal = mongoose.model("Goal");
    const goal = await Goal.findById(doc.goalId);

    if (goal) {
      goal.currentAmount += doc.contributionAmount;
      goal.contributions.push(doc._id);
      await goal.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.GoalContribution ||
  mongoose.model("GoalContribution", goalContributionSchema);
