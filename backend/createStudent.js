import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

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

const createStudent = async () => {
    try {
        const hashedPassword = await bcrypt.hash("password123", 10);
        
        const student = await User.create({
            fullname: "Alice Student",
            email: "alice@student.com",
            phoneNumber: 1111111111,
            password: hashedPassword,
            role: "student",
            profile: {
                profilePhoto: "",
                bio: "Computer Science student looking for internship opportunities",
                skills: ["JavaScript", "Python", "React", "HTML", "CSS"]
            }
        });

        console.log('Student account created successfully!');
        console.log('Login credentials:');
        console.log('Email: alice@student.com');
        console.log('Password: password123');
        console.log('Role: student');

    } catch (error) {
        console.error('Error creating student:', error);
    } finally {
        mongoose.connection.close();
    }
};

connectDB().then(() => {
    createStudent();
});
