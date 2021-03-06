import mongoose from "mongoose";

const reviewCommentSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const imageSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
});

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
    reviewComments: [reviewCommentSchema],
  },
  {
    timestamps: true,
  }
);

const venueSchema = mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    images: [imageSchema],
    coverImage: {
      type: String,
      required: true,
      default: "/uploads/defaultVenue.jpg",
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    approved: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;
