import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Expired"],
      default: "Active",
    },
    // Relationship: One Goal can have many contributions
    contributions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GoalContribution",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Optional if you’ll link goals to users
    },
  },
  { timestamps: true }
);

// Automatically update status based on progress/deadline
goalSchema.pre("save", function (next) {
  if (this.currentAmount >= this.targetAmount) {
    this.status = "Completed";
  } else if (this.deadline < new Date()) {
    this.status = "Expired";
  } else {
    this.status = "Active";
  }
  next();
});

export default mongoose.models.Goal || mongoose.model("Goal", goalSchema);
