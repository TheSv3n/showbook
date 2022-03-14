import mongoose from "mongoose";

const viewerSchema = mongoose.Schema(
  {
    user: {
      type: String,
      require: true,
    },
    seen: {
      type: Boolean,
      require: true,
    },
    performanceId: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

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

const reviewSchema = mongoose.Schema(
  {
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
    privateReview: {
      type: Boolean,
      required: true,
    },
    reviewComments: [reviewCommentSchema],
  },
  {
    timestamps: true,
  }
);

const performanceSchema = mongoose.Schema({
  venueId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  isCancelled: {
    type: Boolean,
    required: true,
    default: false,
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
  user: {
    type: String,
    required: true,
  },
});

const imageSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  performanceId: {
    type: String,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
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
      required: false,
    },
    director: {
      type: String,
      required: false,
    },
    synopsis: {
      type: String,
      required: true,
    },
    images: [imageSchema],
    coverImage: {
      type: String,
      required: true,
      default: "/uploads/defaultShow.jpg",
    },
    roles: [roleSchema],
    performances: [performanceSchema],
    reviews: [reviewSchema],
    viewers: [viewerSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Show = mongoose.model("Show", showSchema);

export default Show;
