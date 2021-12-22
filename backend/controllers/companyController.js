import asyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";

//@desc Create new company
//@route POST /api/companies
//@access Private
const createCompany = asyncHandler(async (req, res) => {
  const { name, description, headquarters } = req.body;
  const coverImage = req.body.coverImage || "/uploads/defaultCompany.jpg";

  const company = new Company({
    name,
    creator: req.user._id,
    description,
    headquarters,
    coverImage,
  });

  const createdCompany = await company.save();

  res.status(201).json(createdCompany);
});

//@desc Fetch company
//@route GET /api/companies/:id
//@access Public
const getCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    res.json(company);
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

//@desc Get Company name
//@route GET /api/companies/:id/name
//@access Public
const getCompanyName = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    res.json(company.name);
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

//@desc Fetch All Companies
//@route GET /api/companies
//@access Public
const getAllCompanies = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const ranked = req.query.ranked;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const count = await Company.countDocuments({ ...keyword });
  const companies = await Company.find({ ...keyword })
    .sort(ranked === "true" ? { rating: -1 } : { createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ companies, page, pages: Math.ceil(count / pageSize), count });
});

export { createCompany, getCompany, getCompanyName, getAllCompanies };
