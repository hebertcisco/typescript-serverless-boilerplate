import mongoose from "mongoose";

const CatsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CatsModel = mongoose.model("cats", CatsSchema);

export default CatsModel;
