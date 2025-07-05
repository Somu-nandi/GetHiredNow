import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Job } from "./models/job.model.js";
import { Application } from "./models/application.model.js";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const createSampleApplications = async () => {
    try {
        // Find the student user
        const student = await User.findOne({ email: "alice@student.com" });
        if (!student) {
            console.log('Student user not found. Please run createStudent.js first.');
            return;
        }

        // Get some jobs to apply to
        const jobs = await Job.find().limit(5);
        if (jobs.length === 0) {
            console.log('No jobs found. Please run seedData.js first.');
            return;
        }

        // Clear existing applications for this student
        await Application.deleteMany({ applicant: student._id });

        // Create sample applications with different statuses
        const applications = [
            {
                job: jobs[0]._id,
                applicant: student._id,
                status: 'pending'
            },
            {
                job: jobs[1]._id,
                applicant: student._id,
                status: 'accepted'
            },
            {
                job: jobs[2]._id,
                applicant: student._id,
                status: 'rejected'
            },
            {
                job: jobs[3]._id,
                applicant: student._id,
                status: 'pending'
            }
        ];

        if (jobs[4]) {
            applications.push({
                job: jobs[4]._id,
                applicant: student._id,
                status: 'pending'
            });
        }

        const createdApplications = await Application.insertMany(applications);

        // Update the jobs to include these applications
        for (let i = 0; i < createdApplications.length; i++) {
            await Job.findByIdAndUpdate(
                createdApplications[i].job,
                { $push: { applications: createdApplications[i]._id } }
            );
        }

        console.log(`\nSample applications created successfully!`);
        console.log(`- ${createdApplications.length} applications created for ${student.fullname}`);
        console.log(`- Applications include: ${applications.map(app => app.status).join(', ')} statuses`);
        console.log(`\nYou can now login as:`);
        console.log(`Email: alice@student.com`);
        console.log(`Password: password123`);
        console.log(`Role: student`);
        console.log(`\nThen visit /applied-jobs to see your applications!`);

    } catch (error) {
        console.error('Error creating sample applications:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the function
connectDB().then(() => {
    createSampleApplications();
});
