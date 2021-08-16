import mongoose from "mongoose";

const performanceSchema = mongoose.Schema({
  venueId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const roleSchema = mongoose.Schema({
  castMemberId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const imageSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

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
    synopsis: {
      type: String,
      required: true,
    },
    images: [imageSchema],
    roles: [roleSchema],
    performances: [performanceSchema],
  },
  {
    timestamps: true,
  }
);

const Show = mongoose.model("Company", showSchema);

export default Show;
