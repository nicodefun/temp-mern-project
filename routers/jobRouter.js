import { Router } from "express";
import {
  validateJobInput,
  validateIdParams,
} from "../middleware/validationMiddleware.js";
const router = Router();

import {
  getAllJobs,
  createJob,
  editJob,
  deleteJob,
  getSingleJob,
  showStat
} from "../controllers/jobController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
// router.get("/api/v1/jobs", getAllJobs);
router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route('/stat').get(showStat);

router
  .route("/:id")
  .get(validateIdParams, getSingleJob)
  .patch(checkForTestUser, validateJobInput, validateIdParams, editJob)
  .delete(checkForTestUser, validateIdParams, deleteJob);

export default router;
