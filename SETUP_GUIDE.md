# 🚀 Quick Setup Guide - Garud LMS

## 🔧 Database Setup Options

### Option 1: Local PostgreSQL (Recommended for Development)

1. **Install PostgreSQL locally:**
   ```bash
   # On macOS with Homebrew
   brew install postgresql
   brew services start postgresql
   
   # On Windows, download from https://www.postgresql.org/download/windows/
   # On Linux: sudo apt-get install postgresql postgresql-contrib
   ```

2. **Create database:**
   ```bash
   createdb garud_lms
   ```

3. **Update .env file:**
   ```env
   DATABASE_URL="postgresql://your_username:your_password@localhost:5432/garud_lms"
   JWT_SECRET="your-secret-key-here"
   ```

### Option 2: Fix Supabase Connection

If you want to use Supabase, update your `.env` file with:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.bzxbxebbhxmcjmlbvjcv.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1&pool_timeout=20&sslmode=require"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.bzxbxebbhxmcjmlbvjcv.supabase.co:5432/postgres?sslmode=require"
JWT_SECRET="your-secret-key-here"
```

**Make sure to:**
- Replace `[YOUR-PASSWORD]` with your actual Supabase password
- Check if your Supabase project is active
- Verify your IP is not blocked by Supabase

### Option 3: Use SQLite (Quickest for Testing)

1. **Update schema.prisma:**
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

2. **Update .env:**
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secret-key-here"
   ```

## 🚀 Application Setup

### 1. Backend Setup
```bash
cd backend
npm install

# Create .env file from example
cp env.example .env
# Edit .env with your database URL

# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Run setup script to create sample data
npm run setup

# Start backend server
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Test the Application
1. Open http://localhost:3000
2. Login with sample credentials:
   - **Admin:** admin@garud.com / password123
   - **Teacher:** teacher@garud.com / password123
   - **Student:** student@garud.com / password123

## 🔍 Troubleshooting

### Database Connection Issues
- **Check if PostgreSQL is running:** `brew services list` (macOS)
- **Verify connection string:** Make sure username/password are correct
- **Test connection:** `psql -h localhost -U your_username -d garud_lms`

### Prisma Issues
- **Reset database:** `npx prisma db push --force-reset`
- **Regenerate client:** `npx prisma generate`
- **View database:** `npx prisma studio`

### Port Issues
- **Backend runs on:** http://localhost:4000
- **Frontend runs on:** http://localhost:3000
- **Make sure ports are available**

## 📱 Sample Data Created

The setup script creates:
- 3 users (admin, teacher, student)
- 2 courses with assignments
- Sample enrollments and submissions

## 🎯 Next Steps

1. **Test all user roles** - login as different users
2. **Create courses** - login as teacher
3. **Submit assignments** - login as student
4. **Grade submissions** - login as teacher
5. **Monitor system** - login as admin

---

**Need help?** Check the console for error messages and ensure all services are running properly.
