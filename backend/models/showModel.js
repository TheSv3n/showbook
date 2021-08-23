import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  performanceId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
});

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
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Show = mongoose.model("Show", showSchema);

export default Show;
