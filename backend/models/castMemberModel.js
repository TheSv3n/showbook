import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const castMemberSchema = mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "/uploads/defaultCastMember.jpg",
    },
    company: {
      type: String,
      required: false,
    },
    isUser: {
      type: Boolean,
      required: true,
      default: false,
    },
    userId: {
      type: String,
      required: false,
    },
    position: {
      type: String,
      required: true,
      default: "actor",
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const CastMember = mongoose.model("CastMember", castMemberSchema);

export default CastMember;
