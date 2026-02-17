# 🚀 Task Manager Web Application

A modern, full-stack task management application built with React, Node.js, Express, and MongoDB. Features beautiful gradients, smooth animations, and secure JWT authentication.

![Tech Stack](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38bdf8)

## ✨ Features

### Frontend Features
- **Modern UI/UX** with gradient backgrounds and smooth animations
- **Responsive Design** using TailwindCSS
- **Real-time Validation** on both client and server side
- **Protected Routes** with JWT authentication
- **Task Management** with full CRUD operations
- **Advanced Filtering** by status, priority, and search
- **Beautiful Animations** including hover effects, transitions, and floating elements
- **Glass Morphism** design patterns throughout the app

### Backend Features
- **RESTful API** built with Express.js
- **JWT Authentication** for secure access
- **Password Hashing** using bcryptjs
- **MongoDB Integration** with Mongoose ODM
- **Input Validation** using express-validator
- **Error Handling** middleware
- **CORS** enabled for cross-origin requests

### Security Features
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Protected API routes with middleware
- ✅ Input validation and sanitization
- ✅ Secure HTTP headers
- ✅ Environment variable configuration

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Request validation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd task-manager-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/taskmanager
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# JWT_EXPIRE=7d
# NODE_ENV=development

# Start MongoDB (if running locally)
# mongod

# Start the server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🗂️ Project Structure

```
task-manager-app/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   └── taskController.js      # Task CRUD operations
│   ├── middleware/
│   │   └── auth.js                # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── Task.js                # Task schema
│   ├── routes/
│   │   ├── auth.js                # Auth routes
│   │   └── tasks.js               # Task routes
│   ├── .env.example               # Environment variables template
│   ├── package.json               # Backend dependencies
│   └── server.js                  # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx # Route protection component
    │   ├── context/
    │   │   └── AuthContext.jsx    # Authentication context
    │   ├── pages/
    │   │   ├── Landing.jsx        # Landing page
    │   │   ├── Login.jsx          # Login page
    │   │   ├── Register.jsx       # Registration page
    │   │   └── Dashboard.jsx      # Main dashboard
    │   ├── services/
    │   │   └── api.js             # API service layer
    │   ├── App.jsx                # Main app component
    │   ├── main.jsx               # React entry point
    │   └── index.css              # Global styles
    ├── index.html                 # HTML template
    ├── package.json               # Frontend dependencies
    ├── vite.config.js             # Vite configuration
    ├── tailwind.config.js         # Tailwind configuration
    └── postcss.config.js          # PostCSS configuration
```

## 🔌 API Endpoints

### Authentication Routes
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
GET    /api/auth/me          # Get current user (Protected)
PUT    /api/auth/profile     # Update user profile (Protected)
```

### Task Routes
```
GET    /api/tasks            # Get all tasks (Protected)
GET    /api/tasks/stats      # Get task statistics (Protected)
GET    /api/tasks/:id        # Get single task (Protected)
POST   /api/tasks            # Create new task (Protected)
PUT    /api/tasks/:id        # Update task (Protected)
DELETE /api/tasks/:id        # Delete task (Protected)
```

### Query Parameters for GET /api/tasks
- `status` - Filter by status (todo, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search in title and description
- `sort` - Sort by field (createdAt, dueDate, priority, title)

## 📱 Application Flow

### 1. User Registration
- User fills registration form with name, email, and password
- Client-side validation checks for valid inputs
- Password is hashed on the server using bcryptjs
- JWT token is generated and returned
- User is automatically logged in and redirected to dashboard

### 2. User Login
- User enters email and password
- Credentials are verified against database
- JWT token is generated and stored in localStorage
- User is redirected to dashboard

### 3. Dashboard Access
- Protected route checks for valid JWT token
- User profile and tasks are fetched from API
- Statistics are displayed (total, todo, in-progress, completed)
- Tasks can be filtered, searched, and sorted

### 4. Task Management
- **Create**: Click "New Task" button, fill form, submit
- **Read**: View all tasks in grid layout with filters
- **Update**: Click edit icon, modify fields, save
- **Delete**: Click delete icon, confirm deletion

## 🎨 UI/UX Features

### Design Elements
- **Gradient Backgrounds**: Animated gradient backgrounds throughout
- **Glass Morphism**: Frosted glass effect on cards and modals
- **Smooth Animations**: Hover effects, transitions, and floating elements
- **Custom Scrollbar**: Styled scrollbar with gradient colors
- **Responsive Design**: Mobile-first approach with breakpoints
- **Color Coding**: Tasks color-coded by status and priority
- **Loading States**: Beautiful loading spinners
- **Toast Notifications**: Success/error messages

### Interactive Elements
- Hover effects on cards scale and add shadows
- Gradient buttons with smooth transitions
- Input fields glow on focus
- Animated background blobs
- Floating logo animation
- Shimmer effects on loading states

## 🔒 Security Best Practices

### Implemented Security Measures
1. **Password Security**
   - Passwords hashed with bcrypt (10 rounds)
   - Never stored in plain text
   - Minimum length requirement enforced

2. **Authentication**
   - JWT tokens with expiration
   - Tokens stored in localStorage
   - Protected API routes with middleware
   - Token validation on every request

3. **Input Validation**
   - Client-side validation for immediate feedback
   - Server-side validation using express-validator
   - Sanitization of user inputs
   - Email format validation

4. **API Security**
   - CORS configuration
   - Error handling without exposing internals
   - Rate limiting ready (can be added)
   - SQL injection prevention (NoSQL)

## 📈 Scalability Considerations

### Current Architecture
- Modular code structure for easy maintenance
- Separation of concerns (MVC pattern)
- Reusable components
- Centralized API service layer
- Context API for state management

### Future Enhancements for Production

#### Frontend Scaling
- **State Management**: Implement Redux or Zustand for complex state
- **Code Splitting**: Lazy load routes and components
- **PWA**: Add service workers for offline support
- **CDN**: Serve static assets from CDN
- **Caching**: Implement React Query for data caching
- **Error Boundaries**: Add error boundaries for graceful failures

#### Backend Scaling
- **Load Balancing**: Use nginx or cloud load balancers
- **Caching**: Implement Redis for session/data caching
- **Database**: 
  - Add database indexing for faster queries
  - Implement connection pooling
  - Consider MongoDB Atlas for managed scaling
- **Rate Limiting**: Add express-rate-limit middleware
- **Logging**: Implement Winston or Morgan for production logs
- **Monitoring**: Add APM tools (New Relic, Datadog)
- **API Gateway**: Consider using Kong or AWS API Gateway

#### DevOps & Deployment
- **Containerization**: Docker for consistent environments
- **CI/CD**: GitHub Actions for automated deployment
- **Environment Management**: Separate dev, staging, prod configs
- **Secrets Management**: Use AWS Secrets Manager or Vault
- **Auto-scaling**: Cloud auto-scaling based on load
- **Health Checks**: Implement health check endpoints
- **Backup Strategy**: Automated database backups

#### Security Enhancements
- **HTTPS**: Enforce HTTPS in production
- **Helmet.js**: Add security headers
- **Rate Limiting**: Prevent brute force attacks
- **Input Sanitization**: Enhanced XSS protection
- **OAuth**: Add social login options
- **2FA**: Two-factor authentication
- **Security Audits**: Regular dependency updates

## 🧪 Testing (Future Implementation)

### Recommended Testing Stack
- **Frontend**: Jest, React Testing Library, Cypress
- **Backend**: Jest, Supertest
- **E2E**: Playwright or Cypress
- **API Testing**: Postman collections

## 📝 Postman Collection

Import the following endpoints into Postman:

### Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile
```
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

### Create Task
```
POST http://localhost:5000/api/tasks
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Complete Project",
  "description": "Finish the task manager project",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-12-31",
  "tags": ["work", "urgent"]
}
```

### Get All Tasks
```
GET http://localhost:5000/api/tasks?status=todo&priority=high
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
```bash
# Build command
npm install

# Start command
npm start

# Environment Variables to set:
# MONGODB_URI, JWT_SECRET, NODE_ENV=production
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build command
npm run build

# Output directory
dist

# Environment Variables:
# VITE_API_URL=your-backend-url
```

## 👨‍💻 Development

### Running in Development Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Building for Production
```bash
# Backend (no build needed)
cd backend
npm start

# Frontend
cd frontend
npm run build

```

## 🤝 Contributing

This is an internship assignment project. For production use, consider:
- Adding comprehensive unit and integration tests
- Implementing proper error logging
- Adding database migrations
- Setting up CI/CD pipeline
- Implementing feature flags
- Adding analytics

## 📄 License

This project is created as an internship assignment and is free to use for educational purposes.

## 🙏 Acknowledgments

- React team for the amazing library
- TailwindCSS for the utility-first CSS framework
- Lucide React for beautiful icons
- Express team for the web framework
- MongoDB team for the database

