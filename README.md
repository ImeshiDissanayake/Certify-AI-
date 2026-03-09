# CertifyAI - AI-Powered Career Development Platform

[![GitHub license](https://img.shields.io/github/license/ImeshiDissanayake/Certify-AI-.svg)](https://github.com/ImeshiDissanayake/Certify-AI-/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/ImeshiDissanayake/Certify-AI-.svg)](https://github.com/ImeshiDissanayake/Certify-AI-)
[![GitHub forks](https://img.shields.io/github/forks/ImeshiDissanayake/Certify-AI-.svg)](https://github.com/ImeshiDissanayake/Certify-AI-)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Branches](#branches)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 Overview

**CertifyAI** is an AI-powered platform that leverages machine learning to help professionals discover the most suitable certifications and learning paths based on their current skills, experience, and career goals. The platform uses advanced NLP techniques to match user profiles with relevant certifications, providing personalized recommendations to accelerate career growth.

Whether you're looking to upskill, pivot to a new career path, or validate your expertise through certifications, CertifyAI analyzes your resume and provides data-driven recommendations tailored to your unique professional profile.

## ✨ Features

### 🤖 AI-Powered Features
- **Resume Analysis**: Upload and parse your resume in PDF format
- **Skill Extraction**: Automatically extract skills from your resume using NLP
- **Smart Matching**: Machine learning algorithm matches your skills to relevant certifications
- **Personalized Recommendations**: Get certification suggestions based on your profile
- **Similarity Scoring**: Cosine similarity-based ranking of certification matches

### 👤 User Management
- **User Authentication**: Secure login and registration system
- **Profile Management**: Create and update user profiles
- **Resume Storage**: Store and manage multiple resumes
- **History Tracking**: Keep track of certification recommendations

### 🎛️ Admin Dashboard
- **User Management**: Monitor and manage user accounts
- **Course Management**: Add and update certification courses
- **Analytics**: View platform statistics and usage metrics
- **System Configuration**: Configure system parameters and settings

### 🎨 User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Navigation**: Easy-to-use interface for all skill levels
- **Real-time Feedback**: Instant certification recommendations
- **Professional Dashboard**: Comprehensive user dashboard

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Component Architecture**: Modern React with hooks
- **State Management**: Context API / React State
- **HTTP Client**: Axios / Fetch API
- **Code Quality**: ESLint

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **API Style**: RESTful API
- **Middleware**: CORS, body-parser
- **Security**: Password hashing with bcrypt

### AI & Machine Learning
- **Language**: Python 3.10+
- **Framework**: FastAPI
- **ML Library**: scikit-learn
- **NLP Processing**: NLTK / spaCy
- **Text Vectorization**: TF-IDF (Term Frequency-Inverse Document Frequency)
- **Similarity Metrics**: Cosine Similarity
- **PDF Processing**: PyPDF2
- **Data Processing**: Pandas, NumPy

### DevOps & Infrastructure
- **Version Control**: Git & GitHub
- **Package Managers**: npm, pip
- **Environment Management**: Virtual Environment (.venv)

## 📁 Project Structure

```
CertifyAI/
├── 📄 README.md                          # Project documentation
├── 📄 GITHUB_SETUP.md                    # GitHub setup guide
├── 📄 .gitignore                         # Git ignore rules
├── 📦 app.py                             # FastAPI main application
├── 🚀 run_ai_server.py                   # AI server launcher
│
├── 📁 backend/                           # Node.js Express Backend
│   ├── 📄 server.js                      # Express server entry point
│   ├── 📄 package.json                   # Node dependencies
│   ├── 📄 package-lock.json              # Dependency lock file
│   │
│   ├── 📁 models/                        # Database schemas
│   │   ├── 📄 User.js                    # User model
│   │   └── 📄 Course.js                  # Course model
│   │
│   └── 📁 routes/                        # API endpoints
│       ├── 📄 auth.js                    # Authentication routes
│       └── 📄 admin.js                   # Admin routes
│
├── 📁 frontend/                          # React Frontend
│   ├── 📄 index.html                     # HTML entry point
│   ├── 📄 package.json                   # React dependencies
│   ├── 📄 package-lock.json              # Dependency lock file
│   ├── 📄 vite.config.js                 # Vite configuration
│   ├── 📄 tailwind.config.js             # Tailwind CSS config
│   ├── 📄 eslint.config.js               # ESLint configuration
│   ├── 📄 README.md                      # Frontend documentation
│   │
│   ├── 📁 public/                        # Static assets
│   │   └── 📄 vite.svg
│   │
│   └── 📁 src/                           # React source code
│       ├── 📄 main.jsx                   # React entry point
│       ├── 📄 App.jsx                    # Root component
│       ├── 📄 App.css                    # Global styles
│       ├── 📄 index.css                  # Reset styles
│       ├── 📄 AuthPage.jsx               # Authentication page
│       │
│       ├── 📁 components/                # Reusable components
│       │   └── 📄 AdminDashboard.jsx     # Admin dashboard
│       │
│       └── 📁 assets/                    # Images, icons, etc.
│           └── 📄 react.svg
│
└── 📁 .venv/                             # Python virtual environment
```

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16.0.0 or higher)
- **Python** (v3.10 or higher)
- **Git** (v2.30.0 or higher)
- **MongoDB** (Local or Atlas Cloud)
- **npm** (v8.0.0 or higher)

### Step 1: Clone the Repository

```bash
git clone https://github.com/ImeshiDissanayake/Certify-AI-.git
cd Certify-AI-
```

### Step 2: Set Up the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (if needed)
# Add your MongoDB connection string and other configs
echo "MONGODB_URI=mongodb://localhost:27017/certifyai" > .env
echo "JWT_SECRET=your_jwt_secret_key" >> .env
echo "PORT=5000" >> .env

# Start the backend server
npm start
# Server will run on http://localhost:5000
```

### Step 3: Set Up the Frontend

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create .env file for API endpoints
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
# Frontend will run on http://localhost:5173
```

### Step 4: Set Up the AI Server

```bash
# Navigate to root directory
cd ..

# Create Python virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install Python dependencies
pip install fastapi uvicorn scikit-learn pandas PyPDF2 joblib pydantic

# Start the AI server
python run_ai_server.py
# Server will run on http://localhost:8000
```

### Step 5: Verify Installation

- ✅ Backend API: http://localhost:5000/api
- ✅ Frontend App: http://localhost:5173
- ✅ AI Server: http://localhost:8000

## 💻 Usage

### For End Users

1. **Create Account**: Sign up on the platform with email and password
2. **Upload Resume**: Upload your resume in PDF format
3. **Get Recommendations**: The AI analyzes your resume and suggests certifications
4. **Explore Results**: Browse recommended certifications with detailed information
5. **Track Progress**: Monitor your selected certifications and progress

### For Administrators

1. **Access Dashboard**: Login with admin credentials
2. **Manage Users**: View and manage user accounts
3. **Manage Courses**: Add, update, or remove certification courses
4. **View Analytics**: Monitor platform usage and user metrics

### API Usage Examples

#### Authentication
```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

#### Get Recommendations
```bash
# Upload resume and get recommendations
curl -X POST http://localhost:8000/recommend \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "resume=@path/to/resume.pdf"
```

## 📡 API Documentation

### Backend API Endpoints

#### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

#### Admin Routes
- `GET /api/admin/users` - Get all users
- `GET /api/admin/courses` - Get all courses
- `POST /api/admin/courses` - Add new course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course

### AI Server Endpoints

#### Recommendation Engine
- `POST /recommend` - Get certification recommendations
  - Input: Resume (PDF file)
  - Output: Ranked list of recommended certifications

- `GET /health` - Check AI server health

## 🔄 Development

### Git Workflow

We follow a standard Git flow with the following branches:

```
main (Production)
  ↑
develop (Integration)
  ↑
feature/* (Development)
```

### Branch Naming Convention

- `main` - Production-ready code
- `develop` - Development integration branch
- `feature/feature-name` - New features
- `bugfix/bug-name` - Bug fixes
- `hotfix/issue-name` - Critical production fixes

### Making Changes

```bash
# Create feature branch from develop
git checkout develop
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat(scope): description of changes"

# Push to remote
git push -u origin feature/my-feature

# Create Pull Request on GitHub
# After review and approval, merge to develop
# Then merge develop to main for release
```

### Code Style

- **JavaScript**: Follow ESLint configuration
- **Python**: Follow PEP 8 style guide
- **Commit Messages**: Use semantic commit messages (feat:, fix:, docs:, etc.)

## 🌿 Project Branches

| Branch | Purpose | Status |
|--------|---------|--------|
| `main` | Production-ready code | ✅ Active |
| `develop` | Development integration branch | ✅ Active |
| `feature/backend-enhancements` | Backend improvements | ✅ Active |
| `feature/frontend-ui` | Frontend UI enhancements | ✅ Active |
| `feature/ai-enhancements` | AI model improvements | ✅ Active |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Steps to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Create** a Pull Request

### Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation for new features
- Test your changes before submitting PR
- Link related issues in your PR

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

MIT License allows you to:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute the software
- ✅ Use privately

With conditions:
- 📌 License and copyright notice

## 👤 Contact & Support

### Author
- **Name**: Imeshi Dissanayake
- **GitHub**: [@ImeshiDissanayake](https://github.com/ImeshiDissanayake)
- **Email**: imeshi.dissanayake@example.com

### Support
- 📧 Open an issue on GitHub for bug reports
- 💬 Discussion forum for feature requests
- 📚 Check documentation in [GITHUB_SETUP.md](GITHUB_SETUP.md)

### Project Links
- **Repository**: https://github.com/ImeshiDissanayake/Certify-AI-
- **Issues**: https://github.com/ImeshiDissanayake/Certify-AI-/issues
- **Discussions**: https://github.com/ImeshiDissanayake/Certify-AI-/discussions

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MongoDB University](https://university.mongodb.com)
- [scikit-learn Documentation](https://scikit-learn.org)

## 🚦 Project Status

| Component | Status | Version |
|-----------|--------|---------|
| Backend API | ✅ Stable | v1.0.0 |
| Frontend UI | ✅ Stable | v1.0.0 |
| AI Engine | ✅ Stable | v1.0.0 |
| Documentation | ✅ Complete | v1.0.0 |

## 🎉 Acknowledgments

- Thanks to all contributors
- Special thanks to the open-source community
- Built with ❤️ for career development

---

**Last Updated**: March 2026

**Made with ❤️ by the CertifyAI Team**
