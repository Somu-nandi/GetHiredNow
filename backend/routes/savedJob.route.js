import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { saveJob, unsaveJob, getSavedJobs, isJobSaved } from "../controllers/savedJob.controller.js";

const router = express.Router();

router.route("/save/:id").post(isAuthenticated, saveJob);
router.route("/unsave/:id").delete(isAuthenticated, unsaveJob);
router.route("/get").get(isAuthenticated, getSavedJobs);
router.route("/check/:id").get(isAuthenticated, isJobSaved);

export default router;
