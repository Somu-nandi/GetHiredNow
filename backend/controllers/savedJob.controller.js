import { SavedJob } from "../models/savedJob.model.js";
import { Job } from "../models/job.model.js";

// Save a job for later
export const saveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Check if the job is already saved
        const existingSavedJob = await SavedJob.findOne({ user: userId, job: jobId });
        if (existingSavedJob) {
            return res.status(400).json({
                message: "Job is already saved",
                success: false
            });
        }

        // Save the job
        const savedJob = await SavedJob.create({
            user: userId,
            job: jobId
        });

        return res.status(201).json({
            message: "Job saved successfully",
            success: true,
            savedJob
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Remove a saved job
export const unsaveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }

        // Find and remove the saved job
        const savedJob = await SavedJob.findOneAndDelete({ user: userId, job: jobId });
        
        if (!savedJob) {
            return res.status(404).json({
                message: "Saved job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job removed from saved list",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get all saved jobs for a user
export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const savedJobs = await SavedJob.find({ user: userId })
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name logo location'
                }
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            savedJobs,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Check if a job is saved by the user
export const isJobSaved = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        const savedJob = await SavedJob.findOne({ user: userId, job: jobId });
        
        return res.status(200).json({
            isSaved: !!savedJob,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
