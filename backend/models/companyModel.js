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

const companySchema = mongoose.Schema(
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
    headquarters: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    coverImage: {
      type: String,
      required: true,
      default: "/uploads/defaultCompany.jpg",
    },
    reviews: [reviewSchema],
    images: [imageSchema],
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
