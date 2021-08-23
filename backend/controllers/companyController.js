import asyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";

//@desc Create new company
//@route POST /api/companies
//@access Private
const createCompany = asyncHandler(async (req, res) => {
  const { name, description, headquarters } = req.body;

  const company = new Company({
    name,
    creator: req.user._id,
    description,
    headquarters,
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

export { createCompany, getCompany };
