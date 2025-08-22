import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";
const PORT = process.env.PORT || 4000;

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Role-based middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
};

// Input validation middleware
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Authentication Routes
app.post("/signup", async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    // Input validation
    if (!email || !password || !role || !name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    if (!["admin", "teacher", "student"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role, name },
    });

    res.status(201).json({ 
      id: user.id, 
      email: user.email, 
      role: user.role, 
      name: user.name 
    });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "User with this email already exists" });
    }
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ 
      token, 
      role: user.role, 
      name: user.name, 
      id: user.id 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(user);
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Course Routes
app.post("/courses", authenticateToken, requireRole(["teacher", "admin"]), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        teacherId: req.user.id
      }
    });
    
    res.status(201).json(course);
  } catch (err) {
    console.error("Create course error:", err);
    res.status(500).json({ error: "Failed to create course" });
  }
});

app.get("/courses", authenticateToken, async (req, res) => {
  try {
    let courses;
    
    if (req.user.role === "teacher") {
      courses = await prisma.course.findMany({
        where: { teacherId: req.user.id },
        include: {
          teacher: { select: { name: true, email: true } },
          enrollments: { include: { user: { select: { name: true, email: true } } } },
          assignments: true
        }
      });
    } else if (req.user.role === "student") {
      courses = await prisma.course.findMany({
        where: {
          enrollments: { some: { userId: req.user.id } }
        },
        include: {
          teacher: { select: { name: true, email: true } },
          assignments: true
        }
      });
    } else {
      // Admin can see all courses
      courses = await prisma.course.findMany({
        include: {
          teacher: { select: { name: true, email: true } },
          enrollments: { include: { user: { select: { name: true, email: true } } } },
          assignments: true
        }
      });
    }
    
    res.json(courses);
  } catch (err) {
    console.error("Get courses error:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

app.post("/courses/:courseId/enroll", authenticateToken, requireRole(["student"]), async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseIdInt = parseInt(courseId);

    if (isNaN(courseIdInt)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: req.user.id,
        courseId: courseIdInt
      },
      include: {
        course: true,
        user: { select: { name: true, email: true } }
      }
    });
    
    res.status(201).json(enrollment);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }
    console.error("Enrollment error:", err);
    res.status(500).json({ error: "Failed to enroll in course" });
  }
});

// Assignment Routes
app.post("/assignments", authenticateToken, requireRole(["teacher", "admin"]), async (req, res) => {
  try {
    const { title, description, dueDate, courseId } = req.body;

    if (!title || !description || !dueDate || !courseId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const courseIdInt = parseInt(courseId);
    if (isNaN(courseIdInt)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        courseId: courseIdInt,
        createdBy: req.user.id
      }
    });
    
    res.status(201).json(assignment);
  } catch (err) {
    console.error("Create assignment error:", err);
    res.status(500).json({ error: "Failed to create assignment" });
  }
});

app.get("/assignments", authenticateToken, async (req, res) => {
  try {
    let assignments;
    
    if (req.user.role === "teacher") {
      assignments = await prisma.assignment.findMany({
        where: { createdBy: req.user.id },
        include: {
          course: true,
          submissions: { include: { student: { select: { name: true, email: true } } } }
        }
      });
    } else if (req.user.role === "student") {
      assignments = await prisma.assignment.findMany({
        where: {
          course: {
            enrollments: { some: { userId: req.user.id } }
          }
        },
        include: {
          course: true,
          submissions: { where: { studentId: req.user.id } }
        }
      });
    } else {
      assignments = await prisma.assignment.findMany({
        include: {
          course: true,
          submissions: { include: { student: { select: { name: true, email: true } } } }
        }
      });
    }
    
    res.json(assignments);
  } catch (err) {
    console.error("Get assignments error:", err);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

// Submission Routes
app.post("/assignments/:assignmentId/submit", authenticateToken, requireRole(["student"]), async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Submission content is required" });
    }

    const assignmentIdInt = parseInt(assignmentId);
    if (isNaN(assignmentIdInt)) {
      return res.status(400).json({ error: "Invalid assignment ID" });
    }

    const submission = await prisma.submission.create({
      data: {
        content,
        assignmentId: assignmentIdInt,
        studentId: req.user.id
      }
    });
    
    res.status(201).json(submission);
  } catch (err) {
    console.error("Submit assignment error:", err);
    res.status(500).json({ error: "Failed to submit assignment" });
  }
});

app.put("/submissions/:submissionId/grade", authenticateToken, requireRole(["teacher", "admin"]), async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { grade } = req.body;

    if (grade === undefined || grade === null) {
      return res.status(400).json({ error: "Grade is required" });
    }

    const gradeNum = parseFloat(grade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      return res.status(400).json({ error: "Grade must be a number between 0 and 100" });
    }

    const submissionIdInt = parseInt(submissionId);
    if (isNaN(submissionIdInt)) {
      return res.status(400).json({ error: "Invalid submission ID" });
    }

    const submission = await prisma.submission.update({
      where: { id: submissionIdInt },
      data: { grade: gradeNum }
    });
    
    res.json(submission);
  } catch (err) {
    console.error("Grade submission error:", err);
    res.status(500).json({ error: "Failed to grade submission" });
  }
});

// User Management Routes
app.get("/students", authenticateToken, requireRole(["admin", "teacher"]), async (req, res) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: "student" },
      select: { id: true, name: true, email: true, createdAt: true }
    });
    
    res.json(students);
  } catch (err) {
    console.error("Get students error:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.get("/teachers", authenticateToken, requireRole(["admin"]), async (req, res) => {
  try {
    const teachers = await prisma.user.findMany({
      where: { role: "teacher" },
      select: { id: true, name: true, email: true, createdAt: true }
    });
    
    res.json(teachers);
  } catch (err) {
    console.error("Get teachers error:", err);
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});
