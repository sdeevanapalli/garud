# Garud LMS - Internship Project Submission

## Project Overview

**Project Name:** Garud LMS (Learning Management System)  
**Technology Stack:** Next.js + Express.js + PostgreSQL  
**Duration:** [Your development time]  
**Submission Date:** [Current Date]

---

## Project Description

Garud LMS is a comprehensive Learning Management System built with modern web technologies, designed to facilitate online education for educational institutions. The system provides role-based access control for administrators, teachers, and students, enabling seamless course management, assignment submission, and grading processes.

### Key Features Implemented:

**Authentication & Authorization**
- JWT-based secure authentication system
- Role-based access control (Admin, Teacher, Student)
- Password hashing with bcrypt
- Protected routes and API endpoints

**Teacher Features**
- Course creation and management
- Assignment creation with due dates
- Student submission grading system
- Course enrollment tracking
- Comprehensive dashboard

**Student Features**
- Course enrollment system
- Assignment submission with rich text
- Grade tracking and progress overview
- Dashboard with statistics
- Real-time updates

**Admin Features**
- System-wide overview and analytics
- User management (students and teachers)
- Course and assignment monitoring
- Health check endpoints

---

## Technical Implementation

**Frontend (Next.js 15.5.0)**
- Framework: Next.js with App Router
- UI Library: React 19.1.0 with TypeScript
- Styling: Tailwind CSS 4.1.12
- HTTP Client: Axios for API communication
- Features: Responsive design, modern UI/UX, real-time updates

**Backend (Express.js 5.1.0)**
- Runtime: Node.js with ES modules
- Framework: Express.js with middleware
- Database ORM: Prisma with PostgreSQL
- Authentication: JWT with bcrypt password hashing
- Features: RESTful API, input validation, error handling

**Database (PostgreSQL)**
- Database: PostgreSQL with Prisma ORM
- Schema: 5 tables (User, Course, Enrollment, Assignment, Submission)
- Relationships: Proper foreign key constraints
- Features: Type-safe database operations

---

## Project Statistics

- Lines of Code: ~2000+
- API Endpoints: 15+
- Database Tables: 5
- User Roles: 3 (Admin, Teacher, Student)
- Sample Users: 6 (with Indian names)
- Sample Courses: 4
- Sample Assignments: 4

---

## Live Demo

**Local Development:**
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Health Check: http://localhost:4000/health

**Sample Login Credentials:**

**Admin Dashboard:**
- Email: admin@garud.com
- Password: password123
- Name: Rajesh Kumar

**Teacher Dashboard:**
- Email: teacher@garud.com
- Password: password123
- Name: Dr. Priya Sharma

**Student Dashboard:**
- Email: student@garud.com
- Password: password123
- Name: Arjun Singh

---

## Installation & Setup

**Prerequisites:**
- Node.js (v18 or higher)
- PostgreSQL database
- npm or pnpm

**Quick Start:**
```bash
# Clone repository
git clone <repository-url>
cd garud

# Backend setup
cd backend
npm install
cp env.example .env
# Edit .env with your database URL
npx prisma db push
npm run setup
npm run dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
```

---

## Technical Skills Demonstrated

**Frontend Development:**
- Modern React with hooks and context
- Next.js App Router implementation
- TypeScript for type safety
- Responsive design with Tailwind CSS
- State management and API integration
- Form validation and error handling

**Backend Development:**
- RESTful API design and implementation
- Express.js middleware and routing
- Database design and ORM usage
- Authentication and authorization
- Input validation and sanitization
- Error handling and logging

**Database & DevOps:**
- PostgreSQL database design
- Prisma ORM with migrations
- Environment variable management
- Git version control
- Project structure and organization

**Soft Skills:**
- Problem-solving and debugging
- Code organization and documentation
- User experience design
- Project planning and execution

---

## Project Structure

```
garud/
├── backend/
│   ├── index.js              # Express server with API endpoints
│   ├── setup.js              # Database setup script
│   ├── package.json          # Backend dependencies
│   └── prisma/
│       └── schema.prisma     # Database schema
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── admin/        # Admin dashboard
│   │       ├── teacher/      # Teacher dashboard
│   │       ├── student/      # Student dashboard
│   │       ├── login/        # Authentication pages
│   │       └── page.tsx      # Home page
│   └── package.json          # Frontend dependencies
├── README.md                 # Project documentation
├── SETUP_GUIDE.md           # Detailed setup instructions
└── .gitignore               # Git ignore rules
```

---

## API Endpoints

**Authentication:**
- POST /signup - User registration
- POST /login - User login
- GET /profile - Get user profile

**Courses:**
- GET /courses - Get courses (role-based)
- POST /courses - Create course (teacher/admin)
- POST /courses/:id/enroll - Enroll in course (student)

**Assignments:**
- GET /assignments - Get assignments (role-based)
- POST /assignments - Create assignment (teacher/admin)
- POST /assignments/:id/submit - Submit assignment (student)

**Submissions:**
- PUT /submissions/:id/grade - Grade submission (teacher/admin)

**Health Check:**
- GET /health - System health status

---

## Learning Outcomes

**Technical Growth:**
- Gained proficiency in full-stack development
- Learned modern web development practices
- Understood database design and management
- Mastered authentication and security concepts

**Project Management:**
- Planned and executed a complete application
- Organized code structure and documentation
- Implemented proper error handling
- Created user-friendly interfaces

**Problem Solving:**
- Resolved database connection issues
- Implemented role-based access control
- Created responsive design solutions
- Optimized API performance

---

## Future Enhancements

- File upload for assignments
- Real-time notifications
- Video conferencing integration
- Mobile app development
- Advanced analytics dashboard
- Multi-language support

---

## Contact Information

**Developer:** [Your Name]  
**Email:** [Your Email]  
**GitHub:** [Your GitHub Profile]  
**LinkedIn:** [Your LinkedIn Profile]

---

This project demonstrates my ability to build full-stack web applications using modern technologies and best practices. I am excited to contribute my skills and continue learning in a professional environment.

---

*Built with Next.js and Express.js*
