import mongoose from "mongoose";

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
      default: "/uploads/defaultUser.jpg",
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
  },
  {
    timestamps: true,
  }
);

const CastMember = mongoose.model("CastMember", castMemberSchema);

export default CastMember;
