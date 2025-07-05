import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    }
}, { timestamps: true });

// Create a compound index to ensure a user can't save the same job twice
savedJobSchema.index({ user: 1, job: 1 }, { unique: true });

export const SavedJob = mongoose.model("SavedJob", savedJobSchema);
