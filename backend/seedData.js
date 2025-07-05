import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";

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

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Company.deleteMany({});
        await Job.deleteMany({});
        
        console.log('Cleared existing data');

        // Create sample recruiter users
        const hashedPassword = await bcrypt.hash("password123", 10);
        
        const recruiters = await User.insertMany([
            {
                fullname: "John Smith",
                email: "john@techcorp.com",
                phoneNumber: 1234567890,
                password: hashedPassword,
                role: "recruiter",
                profile: {
                    profilePhoto: ""
                }
            },
            {
                fullname: "Sarah Johnson",
                email: "sarah@innovate.com",
                phoneNumber: 9876543210,
                password: hashedPassword,
                role: "recruiter",
                profile: {
                    profilePhoto: ""
                }
            },
            {
                fullname: "Mike Davis",
                email: "mike@startup.com",
                phoneNumber: 5555555555,
                password: hashedPassword,
                role: "recruiter",
                profile: {
                    profilePhoto: ""
                }
            }
        ]);

        console.log('Created sample recruiters');

        // Create sample companies
        const companies = await Company.insertMany([
            {
                name: "TechCorp Solutions",
                description: "Leading technology solutions provider specializing in web development and cloud services.",
                website: "https://techcorp.com",
                location: "Bangalore, India",
                logo: "",
                userId: recruiters[0]._id
            },
            {
                name: "Innovate Labs",
                description: "Cutting-edge AI and machine learning research company.",
                website: "https://innovatelabs.com",
                location: "Hyderabad, India",
                logo: "",
                userId: recruiters[1]._id
            },
            {
                name: "StartupHub",
                description: "Fast-growing startup focused on mobile app development.",
                website: "https://startuphub.com",
                location: "Pune, India",
                logo: "",
                userId: recruiters[2]._id
            },
            {
                name: "DataFlow Inc",
                description: "Big data analytics and business intelligence solutions.",
                website: "https://dataflow.com",
                location: "Gurgaon, India",
                logo: "",
                userId: recruiters[0]._id
            },
            {
                name: "CloudTech Systems",
                description: "Cloud infrastructure and DevOps solutions provider.",
                website: "https://cloudtech.com",
                location: "Mumbai, India",
                logo: "",
                userId: recruiters[1]._id
            }
        ]);

        console.log('Created sample companies');

        // Create sample jobs
        const jobs = await Job.insertMany([
            {
                title: "Frontend Developer",
                description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-facing web applications using modern JavaScript frameworks.",
                requirements: ["React", "JavaScript", "HTML", "CSS", "Git"],
                salary: 700000,
                experienceLevel: 2,
                location: "Bangalore, India",
                jobType: "Full-time",
                position: 3,
                company: companies[0]._id,
                created_by: recruiters[0]._id
            },
            {
                title: "Backend Developer",
                description: "Join our backend team to build scalable server-side applications. Experience with Node.js and databases required.",
                requirements: ["Node.js", "Express", "MongoDB", "REST APIs", "JavaScript"],
                salary: 900000,
                experienceLevel: 3,
                location: "Pune, India",
                jobType: "Full-time",
                position: 2,
                company: companies[0]._id,
                created_by: recruiters[0]._id
            },
            {
                title: "Full Stack Developer",
                description: "Looking for a versatile full-stack developer to work on both frontend and backend technologies.",
                requirements: ["React", "Node.js", "MongoDB", "JavaScript", "TypeScript"],
                salary: 1200000,
                experienceLevel: 4,
                location: "Hyderabad, India",
                jobType: "Full-time",
                position: 1,
                company: companies[1]._id,
                created_by: recruiters[1]._id
            },
            {
                title: "Machine Learning Engineer",
                description: "Work on cutting-edge AI projects. Experience with Python and ML frameworks required.",
                requirements: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Data Science"],
                salary: 1800000,
                experienceLevel: 5,
                location: "Mumbai, India",
                jobType: "Full-time",
                position: 2,
                company: companies[1]._id,
                created_by: recruiters[1]._id
            },
            {
                title: "Mobile App Developer",
                description: "Develop innovative mobile applications for iOS and Android platforms.",
                requirements: ["React Native", "JavaScript", "iOS", "Android", "Mobile Development"],
                salary: 1000000,
                experienceLevel: 3,
                location: "Chennai, India",
                jobType: "Full-time",
                position: 2,
                company: companies[2]._id,
                created_by: recruiters[2]._id
            },
            {
                title: "Data Analyst",
                description: "Analyze large datasets to provide business insights and recommendations.",
                requirements: ["SQL", "Python", "Excel", "Data Visualization", "Statistics"],
                salary: 800000,
                experienceLevel: 2,
                location: "Gurgaon, India",
                jobType: "Full-time",
                position: 3,
                company: companies[3]._id,
                created_by: recruiters[0]._id
            },
            {
                title: "DevOps Engineer",
                description: "Manage cloud infrastructure and deployment pipelines. AWS experience preferred.",
                requirements: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
                salary: 1400000,
                experienceLevel: 4,
                location: "Noida, India",
                jobType: "Full-time",
                position: 1,
                company: companies[4]._id,
                created_by: recruiters[1]._id
            },
            {
                title: "UI/UX Designer",
                description: "Design beautiful and intuitive user interfaces for web and mobile applications.",
                requirements: ["Figma", "Adobe Creative Suite", "UI Design", "UX Research", "Prototyping"],
                salary: 750000,
                experienceLevel: 3,
                location: "Bangalore, India",
                jobType: "Full-time",
                position: 2,
                company: companies[0]._id,
                created_by: recruiters[0]._id
            },
            {
                title: "Product Manager",
                description: "Lead product development from conception to launch. Work closely with engineering and design teams.",
                requirements: ["Product Management", "Agile", "Market Research", "Analytics", "Communication"],
                salary: 2000000,
                experienceLevel: 5,
                location: "Mumbai, India",
                jobType: "Full-time",
                position: 1,
                company: companies[1]._id,
                created_by: recruiters[1]._id
            },
            {
                title: "Junior Software Developer",
                description: "Entry-level position for recent graduates. Great opportunity to learn and grow in a supportive environment.",
                requirements: ["JavaScript", "HTML", "CSS", "Git", "Problem Solving"],
                salary: 500000,
                experienceLevel: 1,
                location: "Kolkata, India",
                jobType: "Full-time",
                position: 4,
                company: companies[2]._id,
                created_by: recruiters[2]._id
            }
        ]);

        console.log('Created sample jobs');
        console.log(`\nSeed data created successfully!`);
        console.log(`- ${recruiters.length} recruiters created`);
        console.log(`- ${companies.length} companies created`);
        console.log(`- ${jobs.length} jobs created`);
        console.log(`\nSample login credentials:`);
        console.log(`Email: john@techcorp.com | Password: password123 | Role: recruiter`);
        console.log(`Email: sarah@innovate.com | Password: password123 | Role: recruiter`);
        console.log(`Email: mike@startup.com | Password: password123 | Role: recruiter`);

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the seed function
connectDB().then(() => {
    seedData();
});
