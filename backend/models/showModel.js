import mongoose from "mongoose";

const roleSchema = mongoose.Schema(
  {
    castMemberId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const showSchema = mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    roles: [roleSchema],
  },
  {
    timestamps: true,
  }
);

const Show = mongoose.model("Company", showSchema);

export default Show;
