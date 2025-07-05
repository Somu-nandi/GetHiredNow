# 🚀 GetHiredNow - Modern Job Portal

A full-stack job portal application built with React, Node.js, Express, and MongoDB. Features include job browsing, application tracking, dark mode, and job saving functionality.

![GetHiredNow](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)

## ✨ Features

### 🎯 Core Features
- **Job Browsing** - Browse and search through available job listings
- **Job Applications** - Apply for jobs with resume upload
- **Application Tracking** - Track your job application status
- **Save Jobs** - Bookmark jobs for later viewing
- **User Profiles** - Manage your professional profile
- **Company Management** - Recruiters can manage companies and post jobs

### 🌙 UI/UX Features
- **Dark/Light Mode** - Toggle between themes with persistent storage
- **Responsive Design** - Works seamlessly on all devices
- **Modern UI** - Built with Tailwind CSS and Shadcn/ui components
- **Smooth Animations** - Enhanced user experience with transitions

### 👥 User Roles
- **Students/Job Seekers** - Browse, apply, and save jobs
- **Recruiters** - Post jobs, manage companies, view applicants

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful and accessible UI components
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Somu-nandi/GetHiredNow.git
   cd GetHiredNow
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

5. **Start the Application**
   
   **Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend Server:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📱 Usage

### For Job Seekers
1. **Sign up** as a student
2. **Browse jobs** on the Jobs page
3. **Save interesting jobs** using the bookmark icon
4. **Apply for jobs** with your resume
5. **Track applications** on the Applied Jobs page
6. **Manage your profile** and skills

### For Recruiters
1. **Sign up** as a recruiter
2. **Create your company** profile
3. **Post job listings** with detailed requirements
4. **Manage applications** and review candidates
5. **Update company information**

## 🎨 Screenshots

### Light Mode
- Clean and professional interface
- Easy navigation and job browsing

### Dark Mode
- Eye-friendly dark theme
- Consistent styling across all components

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/logout` - User logout

### Jobs
- `GET /api/v1/job/get` - Get all jobs
- `GET /api/v1/job/get/:id` - Get job by ID
- `POST /api/v1/job/post` - Post new job (recruiter)

### Saved Jobs
- `POST /api/v1/saved-job/save/:id` - Save a job
- `DELETE /api/v1/saved-job/unsave/:id` - Remove saved job
- `GET /api/v1/saved-job/get` - Get user's saved jobs

### Applications
- `POST /api/v1/application/apply/:id` - Apply for job
- `GET /api/v1/application/get` - Get user applications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author


**Soumya Nandi**
- GitHub: [@Somu-nandi](https://github.com/Somu-nandi)
- LinkedIn: [Soumya Nandi](https://linkedin.com/in/soumya-nandi-7a0347249)

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- Inspired by modern job portal platforms
- Built with love for the developer community

---

⭐ **Star this repository if you found it helpful!**
