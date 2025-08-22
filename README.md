# 🦅 Garud LMS - Educational Management System

A comprehensive Learning Management System (LMS) built with Next.js and Express.js, featuring role-based access control for students, teachers, and administrators. Perfect for educational institutions in India and worldwide.

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication with 24-hour token expiry
- Role-based access control (Student, Teacher, Admin)
- User registration and login system with input validation
- Protected routes and API endpoints
- Password hashing with bcrypt

### 👨‍🏫 Teacher Features
- Create and manage courses with detailed descriptions
- Create assignments with due dates and requirements
- Grade student submissions with numerical scoring
- View course enrollments and student progress
- Comprehensive dashboard with course overview

### 👨‍🎓 Student Features
- View enrolled courses and course details
- Submit assignments with rich text content
- Track grades and submission history
- Dashboard with progress overview and statistics
- Course enrollment system

### 👨‍💼 Admin Features
- System-wide overview and analytics
- User management (view all students and teachers)
- Course and assignment monitoring
- Comprehensive dashboard with statistics
- Health check endpoints

### 🛠 Technical Features
- Modern, responsive UI with Tailwind CSS
- Real-time data updates and state management
- RESTful API with Express.js and proper error handling
- PostgreSQL database with Prisma ORM
- TypeScript support for type safety
- Input validation and sanitization
- Graceful error handling and logging

## 🛠 Tech Stack

### Frontend
- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - UI library with modern hooks
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **Express.js 5.1.0** - Node.js web framework
- **Prisma** - Database ORM with type safety
- **PostgreSQL** - Relational database
- **bcryptjs** - Password hashing and security
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing

### Database
- **PostgreSQL** - Robust relational database
- **Prisma Migrations** - Database schema management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or pnpm

### 1. Clone the Repository
```bash
git clone <repository-url>
cd garud
```

### 2. Backend Setup
```bash
cd backend
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your database URL and JWT secret

# Set up database
npx prisma generate
npx prisma db push

# Create sample data
npm run setup

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start the development server
npm run dev
```

### 4. Environment Variables
Create a `.env` file in the backend directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/garud_lms"
JWT_SECRET="your-secret-key-here"
PORT=4000
NODE_ENV=development
```

## 🚀 Usage

### Starting the Application
1. Start the backend server: `cd backend && npm run dev`
2. Start the frontend server: `cd frontend && npm run dev`
3. Open your browser and navigate to `http://localhost:3000`

### Sample Users (Indian Names)
The setup script creates these sample users:

#### 👨‍💼 Admin
- **Email:** `admin@garud.com`
- **Password:** `password123`
- **Name:** Rajesh Kumar

#### 👨‍🏫 Teachers
- **Email:** `teacher@garud.com`
- **Password:** `password123`
- **Name:** Dr. Priya Sharma

- **Email:** `teacher2@garud.com`
- **Password:** `password123`
- **Name:** Prof. Amit Patel

#### 👨‍🎓 Students
- **Email:** `student@garud.com`
- **Password:** `password123`
- **Name:** Arjun Singh

- **Email:** `student2@garud.com`
- **Password:** `password123`
- **Name:** Kavya Reddy

- **Email:** `student3@garud.com`
- **Password:** `password123`
- **Name:** Rahul Verma

### Workflow Example
1. **Admin** (Rajesh Kumar) monitors the system
2. **Teachers** (Dr. Priya Sharma, Prof. Amit Patel) create courses and assignments
3. **Students** (Arjun, Kavya, Rahul) enroll in courses and submit assignments
4. **Teachers** grade submissions and provide feedback
5. **Students** view their grades and progress

## 📁 Project Structure

```
garud/
├── backend/
│   ├── index.js              # Express server with API endpoints
│   ├── setup.js              # Database setup script
│   ├── package.json          # Backend dependencies
│   ├── env.example           # Environment variables template
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

## 🔧 API Endpoints

### Authentication
- `POST /signup` - User registration with validation
- `POST /login` - User login with JWT token
- `GET /profile` - Get user profile information

### Courses
- `GET /courses` - Get courses (role-based access)
- `POST /courses` - Create course (teacher/admin only)
- `POST /courses/:id/enroll` - Enroll in course (student only)

### Assignments
- `GET /assignments` - Get assignments (role-based access)
- `POST /assignments` - Create assignment (teacher/admin only)
- `POST /assignments/:id/submit` - Submit assignment (student only)

### Submissions
- `PUT /submissions/:id/grade` - Grade submission (teacher/admin only)

### User Management
- `GET /students` - Get all students (admin/teacher only)
- `GET /teachers` - Get all teachers (admin only)

### Health Check
- `GET /health` - System health status

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Interface**: Clean, professional design with Tailwind CSS
- **Interactive Elements**: Modals, forms, and real-time updates
- **User Feedback**: Loading states, success/error messages
- **Navigation**: Tab-based navigation for different sections
- **Accessibility**: Proper contrast and keyboard navigation

## 🔒 Security Features

- JWT token-based authentication with expiry
- Password hashing with bcrypt (10 rounds)
- Role-based access control (RBAC)
- Protected API endpoints with middleware
- Input validation and sanitization
- CORS configuration for cross-origin requests
- Environment variable protection

## 🚀 Deployment

### Backend Deployment
1. Set up a PostgreSQL database (e.g., on Railway, Supabase, or AWS RDS)
2. Deploy to platforms like Railway, Heroku, or DigitalOcean
3. Set environment variables in your deployment platform
4. Run database migrations: `npx prisma db push`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or any static hosting platform
3. Configure environment variables for API endpoints

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-super-secure-jwt-secret"
PORT=4000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support or questions:
- Open an issue in the repository
- Check the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
- Review the console logs for error messages

## 🎯 Roadmap

- [ ] File upload for assignments
- [ ] Real-time notifications
- [ ] Video conferencing integration
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

**Built with ❤️ using Next.js and Express.js for educational institutions in India and worldwide**

*Garud - The divine eagle, symbolizing knowledge and wisdom in Indian mythology*
