// import { nanoid } from "nanoid";
import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import day from "dayjs";
// let jobs = [
//     { id: nanoid(), company: "apple", position: "front-end" },
//     { id: nanoid(), company: "google", position: "back-end" },
//     { id: "123", company: "google", position: "back-end" },
//   ];

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort} = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search) {
    // queryObject.position = req.query.search
    queryObject.$or = [{ position: { $regex: search, $options: "i" } }];
  }
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page-1) * limit


  const sortKey = sortOptions[sort] || sortOptions.newest;
  //sort & skip && limit won't change the totalJobs
  const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit); //empty --> all
  // console.log(req.user); //created in authMiddleware
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs/limit)
  res.status(StatusCodes.OK).json({ totalJobs, jobs, numOfPages, currentPage:page });
};

export const createJob = async (req, res) => {
  // const { company, position } = req.body;
  // if (!company || !position) {
  //   return res
  //     .status(400)
  //     .json({ msg: "please provide company and position." });
  // }
  // const id = nanoid(10);
  // const job = { id, company, position };
  // jobs.push(job);
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const theJob = await Job.findById(id);
  // if (!theJob) throw new NotFoundError(`no job with id ${id}`)
  res.status(StatusCodes.OK).json({ theJob });
};
export const editJob = async (req, res) => {
  //   const { company, position } = req.body;
  //   if (!company || !position) {
  //     return res.status(400).json({ msg: "please provide company and position" });
  //   }
  const { id } = req.params;
  const updatedJob = await Job.findOneAndUpdate({ _id: id }, req.body, { new: true });
  // if (!updatedJob) throw new NotFoundError(`no job with id ${id}`);
  //   theJob.company = company;
  //   theJob.position = position;
  res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findOneAndDelete(id);
  // if (!removedJob)  throw new NotFoundError(`no job with id ${id}`);
  // const newJobs = jobs.filter((job) => job.id !== id);
  // jobs = newJobs;
  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedJob });
};

export const showStat = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  // console.log(defaultStats);
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": -1, "_id.month": -1 },
    },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return {
        date,
        count,
      };
    })
    .reverse();
  // console.log(monthlyApplications)
  res.status(200).json({ defaultStats, monthlyApplications });
};
