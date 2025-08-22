import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Setting up database...");

  // Create sample users with Indian names
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@garud.com" },
    update: {},
    create: {
      email: "admin@garud.com",
      password: hashedPassword,
      role: "admin",
      name: "Rajesh Kumar"
    },
  });

  // Create teacher users
  const teacher1 = await prisma.user.upsert({
    where: { email: "teacher@garud.com" },
    update: {},
    create: {
      email: "teacher@garud.com",
      password: hashedPassword,
      role: "teacher",
      name: "Dr. Priya Sharma"
    },
  });

  const teacher2 = await prisma.user.upsert({
    where: { email: "teacher2@garud.com" },
    update: {},
    create: {
      email: "teacher2@garud.com",
      password: hashedPassword,
      role: "teacher",
      name: "Prof. Amit Patel"
    },
  });

  // Create student users
  const student1 = await prisma.user.upsert({
    where: { email: "student@garud.com" },
    update: {},
    create: {
      email: "student@garud.com",
      password: hashedPassword,
      role: "student",
      name: "Arjun Singh"
    },
  });

  const student2 = await prisma.user.upsert({
    where: { email: "student2@garud.com" },
    update: {},
    create: {
      email: "student2@garud.com",
      password: hashedPassword,
      role: "student",
      name: "Kavya Reddy"
    },
  });

  const student3 = await prisma.user.upsert({
    where: { email: "student3@garud.com" },
    update: {},
    create: {
      email: "student3@garud.com",
      password: hashedPassword,
      role: "student",
      name: "Rahul Verma"
    },
  });

  // Create sample courses
  const course1 = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Computer Science Fundamentals",
      description: "Learn the fundamentals of programming, algorithms, and data structures",
      teacherId: teacher1.id
    },
  });

  const course2 = await prisma.course.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Web Development with React",
      description: "Master modern web development using React, Node.js, and modern JavaScript",
      teacherId: teacher1.id
    },
  });

  const course3 = await prisma.course.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "Database Management Systems",
      description: "Learn SQL, database design, and data modeling concepts",
      teacherId: teacher2.id
    },
  });

  const course4 = await prisma.course.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: "Machine Learning Basics",
      description: "Introduction to machine learning algorithms and data science",
      teacherId: teacher2.id
    },
  });

  // Create sample assignments
  const assignment1 = await prisma.assignment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Programming Fundamentals Quiz",
      description: "Complete the quiz on basic programming concepts including variables, loops, and functions",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      courseId: course1.id,
      createdBy: teacher1.id
    },
  });

  const assignment2 = await prisma.assignment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "React Component Project",
      description: "Create a React application with multiple components demonstrating state management",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      courseId: course2.id,
      createdBy: teacher1.id
    },
  });

  const assignment3 = await prisma.assignment.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "Database Design Assignment",
      description: "Design a database schema for an e-commerce platform with proper relationships",
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      courseId: course3.id,
      createdBy: teacher2.id
    },
  });

  const assignment4 = await prisma.assignment.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: "Linear Regression Implementation",
      description: "Implement linear regression from scratch using Python and NumPy",
      dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
      courseId: course4.id,
      createdBy: teacher2.id
    },
  });

  // Enroll students in courses
  const enrollments = [
    { userId: student1.id, courseId: course1.id },
    { userId: student1.id, courseId: course2.id },
    { userId: student2.id, courseId: course1.id },
    { userId: student2.id, courseId: course3.id },
    { userId: student3.id, courseId: course2.id },
    { userId: student3.id, courseId: course4.id },
  ];

  for (const enrollment of enrollments) {
    await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: enrollment.userId, courseId: enrollment.courseId } },
      update: {},
      create: enrollment,
    });
  }

  // Create some sample submissions
  const submission1 = await prisma.submission.upsert({
    where: { id: 1 },
    update: {},
    create: {
      content: "I have completed the programming fundamentals quiz. The concepts of variables, loops, and functions are now clear to me.",
      assignmentId: assignment1.id,
      studentId: student1.id,
      grade: 85
    },
  });

  const submission2 = await prisma.submission.upsert({
    where: { id: 2 },
    update: {},
    create: {
      content: "React component project completed with proper state management using hooks and context API.",
      assignmentId: assignment2.id,
      studentId: student1.id,
      grade: 92
    },
  });

  const submission3 = await prisma.submission.upsert({
    where: { id: 3 },
    update: {},
    create: {
      content: "Database design for e-commerce platform with proper normalization and relationships implemented.",
      assignmentId: assignment3.id,
      studentId: student2.id,
      grade: 88
    },
  });

  console.log("✅ Database setup completed!");
  console.log("\n👥 Sample users created:");
  console.log("Admin: admin@garud.com / password123 (Rajesh Kumar)");
  console.log("Teacher 1: teacher@garud.com / password123 (Dr. Priya Sharma)");
  console.log("Teacher 2: teacher2@garud.com / password123 (Prof. Amit Patel)");
  console.log("Student 1: student@garud.com / password123 (Arjun Singh)");
  console.log("Student 2: student2@garud.com / password123 (Kavya Reddy)");
  console.log("Student 3: student3@garud.com / password123 (Rahul Verma)");
  console.log("\n📚 Sample courses and assignments have been created.");
  console.log("📝 Sample submissions with grades have been added.");
}

main()
  .catch((e) => {
    console.error("❌ Error during setup:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
